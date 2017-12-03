import musicDay from './../sounds/unitock.mp3';
import musicNight from './../sounds/unitocknight.mp3';

export default class MusicManager
{
    constructor()
    {
        this.tracks = {};
        this.audioPlaying = false;
    }

    init()
    {
        this.initAudioTracks();

        document.getElementById('musicToggle').addEventListener('click', this.toggleAudioPlaying.bind(this), false);
    }

    initAudioTracks()
    {
        const musicTracks = [
            {
                name: 'day',
                filePath: musicDay,
            },
            {
                name: 'night',
                filePath: musicNight,
            },
        ];

        musicTracks.forEach((track) =>
        {
            this.tracks[track.name] = document.createElement('audio');
            this.tracks[track.name].src = track.filePath;
            this.tracks[track.name].preload = 'none';
            this.tracks[track.name].loop = true;
        });
    }

    toggleAudioPlaying()
    {
        Object.keys(this.tracks).forEach((track) =>
        {
            if (this.audioPlaying)
            {
                this.tracks[track].pause();
                this.tracks[track].currentTime = 0;
            }
            else
            {
                this.tracks[track].muted = true;
                this.tracks[track].play();
            }
        });

        this.audioPlaying = !this.audioPlaying;
    }

    triggerMusic(isNight)
    {
        if (this.audioPlaying)
        {
            if (isNight && this.tracks.night.readyState >= 3)
            {
                this.tracks.day.pause();

                if (this.tracks.night.muted)
                {
                    this.tracks.night.currentTime = 0;
                    this.tracks.night.muted = false;
                }

                this.tracks.night.play();
            }
            else if (this.tracks.day.readyState >= 3)
            {
                this.tracks.night.pause();

                if (this.tracks.day.muted)
                {
                    this.tracks.day.currentTime = 0;
                    this.tracks.day.muted = false;
                }

                this.tracks.day.play();
            }
        }
    }
}
