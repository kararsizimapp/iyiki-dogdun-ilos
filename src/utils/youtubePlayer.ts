// Official YouTube IFrame Player API Client for Background Music & Soundtrack
// Video ID: h0mQWe-EPcw (Yalın - Akşamüstü)

export const YOUTUBE_VIDEO_ID = 'h0mQWe-EPcw';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: any;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
  }
}

type MusicStateListener = (isPlaying: boolean) => void;

class YouTubeMusicManager {
  private player: any = null;
  private isReady: boolean = false;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private pendingPlay: boolean = false;
  private listeners: Set<MusicStateListener> = new Set();
  private hasInitialized: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadYouTubeIframeAPI();
      this.attachUserGestureFallback();
    }
  }

  // Load YouTube IFrame API Script asynchronously
  public loadYouTubeIframeAPI(): Promise<void> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve();
        return;
      }

      if (window.YT && window.YT.Player) {
        resolve();
        return;
      }

      const existingScript = document.getElementById('youtube-iframe-api-script');
      if (existingScript) {
        const interval = setInterval(() => {
          if (window.YT && window.YT.Player) {
            clearInterval(interval);
            resolve();
          }
        }, 50);
        return;
      }

      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (previousCallback) {
          try {
            previousCallback();
          } catch (e) {
            console.error('[YouTube Music] Previous onYouTubeIframeAPIReady error:', e);
          }
        }
        resolve();
      };

      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(tag, firstScript);
      } else {
        document.head.appendChild(tag);
      }
    });
  }

  // Initialize YT.Player on container element
  public initPlayer(containerId: string = 'youtube-global-player'): void {
    if (typeof window === 'undefined') return;
    if (this.player || this.hasInitialized) return;

    this.hasInitialized = true;

    const setup = () => {
      const container = document.getElementById(containerId);
      if (!container) {
        console.warn(`[YouTube Music] Container #${containerId} not found in DOM`);
        return;
      }

      try {
        this.player = new window.YT!.Player(containerId, {
          height: '240',
          width: '320',
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
            fs: 0,
            iv_load_policy: 3,
            loop: 1,
            playlist: YOUTUBE_VIDEO_ID,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            origin: window.location.origin
          },
          events: {
            onReady: (event: any) => {
              this.isReady = true;
              try {
                event.target.unMute();
                event.target.setVolume(100);
              } catch (err) {
                console.warn('[YouTube Music] Failed to set initial volume:', err);
              }

              if (this.pendingPlay) {
                try {
                  event.target.playVideo();
                } catch (err) {
                  console.warn('[YouTube Music] Failed to start pending playback on ready:', err);
                }
              }
            },
            onStateChange: (event: any) => {
              const YTState = window.YT?.PlayerState;
              if (!YTState) return;

              if (event.data === YTState.PLAYING) {
                this.isPlaying = true;
                this.pendingPlay = false;
                this.notifyListeners(true);
              } else if (event.data === YTState.PAUSED) {
                this.isPlaying = false;
                this.notifyListeners(false);
              } else if (event.data === YTState.ENDED) {
                // Loop explicitly when video completes
                try {
                  event.target.playVideo();
                } catch (err) {
                  console.warn('[YouTube Music] Failed to loop video on ended:', err);
                }
              }
            },
            onError: (event: any) => {
              console.warn('[YouTube Music] Player error event:', event.data);
            }
          }
        });
      } catch (error) {
        console.error('[YouTube Music] Error creating YT.Player instance:', error);
      }
    };

    if (window.YT && window.YT.Player) {
      setup();
    } else {
      this.loadYouTubeIframeAPI().then(() => {
        setup();
      });
    }
  }

  // Synchronous execution within user gesture (click / touch event)
  public play(): void {
    this.pendingPlay = true;
    if (this.player && this.isReady && typeof this.player.playVideo === 'function') {
      try {
        if (!this.isMuted) {
          this.player.unMute();
          this.player.setVolume(100);
        }
        this.player.playVideo();
      } catch (err) {
        console.error('[YouTube Music] Error executing playVideo():', err);
      }
    } else {
      this.initPlayer();
    }
  }

  public pause(): void {
    this.pendingPlay = false;
    this.isPlaying = false;
    if (this.player && this.isReady && typeof this.player.pauseVideo === 'function') {
      try {
        this.player.pauseVideo();
      } catch (err) {
        console.error('[YouTube Music] Error executing pauseVideo():', err);
      }
    }
    this.notifyListeners(false);
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (this.player && this.isReady) {
      try {
        if (muted) {
          this.player.mute();
        } else {
          this.player.unMute();
          this.player.setVolume(100);
        }
      } catch (err) {
        console.error('[YouTube Music] Error changing mute state:', err);
      }
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public subscribe(listener: MusicStateListener): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(playing: boolean): void {
    this.listeners.forEach((listener) => {
      try {
        listener(playing);
      } catch (err) {
        console.error('[YouTube Music] Error in subscriber callback:', err);
      }
    });
  }

  private attachUserGestureFallback(): void {
    const unlockHandler = () => {
      if (this.pendingPlay && !this.isPlaying && this.player && this.isReady) {
        try {
          if (!this.isMuted) {
            this.player.unMute();
            this.player.setVolume(100);
          }
          this.player.playVideo();
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('touchstart', unlockHandler, { passive: true });
    window.addEventListener('touchend', unlockHandler, { passive: true });
    window.addEventListener('click', unlockHandler, { passive: true });
  }
}

export const youtubeMusic = new YouTubeMusicManager();
