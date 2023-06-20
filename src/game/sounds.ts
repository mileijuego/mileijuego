import { Howl } from 'howler';

export enum SoundGroup {
  Music,
  Effect,
}

interface IGameSound {
  src: string[];
  group?: SoundGroup;
  preload?: boolean;
  loop?: boolean;
  volume?: number;
}

export class GameSound {
  private snd: Howl;
  public readonly group: SoundGroup;

  constructor({
    src,
    group = SoundGroup.Effect,
    preload,
    loop,
    volume,
  }: IGameSound) {
    this.snd = new Howl({
      src: src,
      preload,
      loop,
      volume,
    });

    this.group = group;
  }

  public load() {
    return this.snd.load();
  }

  public play() {
    return this.snd.play();
  }

  public stop() {
    return this.snd.stop();
  }

  public pause() {
    return this.snd.pause();
  }

  public mute(value: boolean) {
    return this.snd.mute(value);
  }

  public volume(value: number) {
    return this.snd.volume(value);
  }

  public on(event: string, callback: (id: any, err: any) => void) {
    return this.snd.on(event, callback);
  }

  public once(event: string, callback: (id: any, err: any) => void) {
    return this.snd.once(event, callback);
  }

  public playing() {
    return this.snd.playing();
  }
}

interface ISounds {
  [key: string]: GameSound;
}

const sounds: ISounds = {
  // Music
  'music-intro': new GameSound({
    src: ['/snd/music-intro.mp3'],
    group: SoundGroup.Music,
    preload: false,
    loop: true,
  }),
  // 'music-intro-2': new Howl({
  //   src: ['/snd/music-intro-2.mp3'],
  //   preload: true,
  //   loop: true,
  // }),
  'music-epic': new GameSound({
    src: ['/snd/music-epic.mp3'],
    group: SoundGroup.Music,
    preload: false, // To avoid over use banch width.
    volume: 1 / 3,
    loop: true,
  }),
  'music-dark': new GameSound({
    src: ['/snd/music-dark.mp3'],
    group: SoundGroup.Music,
    preload: false, // To avoid over use banch width.
    volume: 1 / 3,
    loop: true,
  }),

  // Effects
  ak47: new GameSound({
    src: ['/snd/ak47.mp3'],
    preload: true,
    volume: 0.2,
  }),
  shotgun: new GameSound({
    src: ['/snd/shotgun.mp3'],
    preload: true,
    volume: 0.2,
  }),
  pain: new GameSound({
    src: ['/snd/pain.mp3'],
    preload: true,
    volume: 0.2,
  }),
  heal: new GameSound({
    src: ['/snd/heal.mp3'],
    preload: true,
    volume: 0.2,
  }),
  'wall-hit': new GameSound({
    src: ['/snd/wall-hit.mp3'],
    preload: true,
    volume: 0.2,
  }),

  // Agents
  'milei-viva-la-libertad': new GameSound({
    src: ['/snd/milei-viva-la-libertad.mp3'],
    preload: true,
  }),
  'milei-zurdos-dem': new GameSound({
    src: ['/snd/milei-zurdos-dem.mp3'],
    preload: true,
  }),
  'milei-super-libertarian': new GameSound({
    src: ['/snd/milei-super-libertarian.mp3'],
    preload: true,
  }),
  hater: new GameSound({
    src: ['/snd/hater.mp3'],
    preload: true,
  }),
  'pibi-les-pibis': new GameSound({
    src: ['/snd/pibi-les-pibis.mp3'],
    preload: true,
  }),
  'pibi-futbol': new GameSound({
    src: ['/snd/pibi-futbol.mp3'],
    preload: true,
  }),
  'pibi-manija': new GameSound({
    src: ['/snd/pibi-manija.mp3'],
    preload: true,
  }),
  'ofe-me-seca': new GameSound({
    src: ['/snd/ofe-me-seca.mp3'],
    preload: true,
  }),
  'ofe-con-tus-hijos': new GameSound({
    src: ['/snd/ofe-con-tus-hijos.mp3'],
    preload: true,
  }),
  'ofe-buena-gente': new GameSound({
    src: ['/snd/ofe-buena-gente.mp3'],
    preload: true,
  }),
  'dialogo-consenso': new GameSound({
    src: ['/snd/dialogo-consenso.mp3'],
    preload: true,
    volume: 1,
  }),
  grieta: new GameSound({
    src: ['/snd/grieta.mp3'],
    preload: true,
    volume: 1,
  }),
  'si-se-puede': new GameSound({
    src: ['/snd/si-se-puede.mp3'],
    preload: true,
    volume: 0.5,
  }),
  gorilla: new GameSound({
    src: ['/snd/gorilla.mp3'],
    preload: true,
    volume: 0.5,
  }),
  'crisistina-yo-pelotudo': new GameSound({
    src: ['/snd/crisistina-yo-pelotudo.mp3'],
    preload: true,
  }),
  'crisistina-golden-chori': new GameSound({
    src: ['/snd/crisistina-golden-chori.mp3'],
    preload: true,
  }),
  'crisistina-devil': new GameSound({
    src: ['/snd/crisistina-devil.mp3'],
    preload: true,
  }),
  'crisistina-miedo': new GameSound({
    src: ['/snd/crisistina-miedo.mp3'],
    preload: true,
  }),
  'expert-yatelodije': new GameSound({
    src: ['/snd/expert-yatelodije.mp3'],
    preload: true,
  }),
  'expert-genero': new GameSound({
    src: ['/snd/expert-genero.mp3'],
    preload: true,
  }),
  'kicilove-pudio': new GameSound({
    src: ['/snd/kicilove-pudio.mp3'],
    preload: true,
  }),
  'gabois-paso': new GameSound({
    src: ['/snd/gabois-paso.mp3'],
    preload: true,
  }),
  'gabois-saqueos': new GameSound({
    src: ['/snd/gabois-saqueos.mp3'],
    preload: true,
  }),
  'gabois-helicoptero': new GameSound({
    src: ['/snd/gabois-helicoptero.mp3'],
    preload: true,
  }),
  'gabois-reencarnacion': new GameSound({
    src: ['/snd/gabois-reencarnacion.mp3'],
    preload: true,
  }),
  'gordo-mortero-gun': new GameSound({
    src: ['/snd/gordo-mortero-gun.mp3'],
    preload: true,
  }),

  // Bullshit
  'bullshit-1': new GameSound({
    src: ['/snd/bullshit-1.mp3'],
    preload: true,
  }),
  'bullshit-2': new GameSound({
    src: ['/snd/bullshit-2.mp3'],
    preload: true,
  }),
  'bullshit-3': new GameSound({
    src: ['/snd/bullshit-3.mp3'],
    preload: true,
  }),
  bulldog: new GameSound({
    src: ['/snd/bulldog.mp3'],
    preload: true,
  }),

  // Masgloton
  'masgloton-economia': new GameSound({
    src: ['/snd/masgloton-economia.mp3'],
    preload: true,
  }),
  'masgloton-procedan': new GameSound({
    src: ['/snd/masgloton-procedan.mp3'],
    preload: true,
  }),
  'masgloton-espectaculares': new GameSound({
    src: ['/snd/masgloton-espectaculares.mp3'],
    preload: true,
  }),
  'masgloton-barrani': new GameSound({
    src: ['/snd/masgloton-barrani.mp3'],
    preload: true,
  }),

  // Skills
  'zurdos-tiemblen': new GameSound({
    src: ['/snd/zurdos-tiemblen.mp3'],
    preload: true,
  }),
  'despertar-leones': new GameSound({
    src: ['/snd/despertar-leones.mp3'],
    preload: true,
  }),
  'libertad-avanza': new GameSound({
    src: ['/snd/libertad-avanza.mp3'],
    preload: true,
  }),
  'milei-se-lo-pueden-meter': new GameSound({
    src: ['/snd/milei-se-lo-pueden-meter.mp3'],
    preload: true,
  }),
  'milei-porquenotevas': new GameSound({
    src: ['/snd/milei-porquenotevas.mp3'],
    preload: true,
  }),
  'milei-datos': new GameSound({
    src: ['/snd/milei-datos.mp3'],
    preload: true,
  }),
  haha: new GameSound({
    src: ['/snd/haha.mp3'],
    preload: true,
  }),
  'fin-al-patriarcado': new GameSound({
    src: ['/snd/fin-al-patriarcado.mp3'],
    preload: true,
  }),
  'chori-circle': new GameSound({
    src: ['/snd/chori-circle.mp3'],
    preload: true,
  }),
  'ya-de-bebe': new GameSound({
    src: ['/snd/ya-de-bebe.mp3'],
    preload: true,
  }),
  pelado: new GameSound({
    src: ['/snd/pelado.mp3'],
    preload: true,
  }),
  'derecha-maldita': new GameSound({
    src: ['/snd/derecha-maldita.mp3'],
    preload: true,
  }),
  'gusano-larrata': new GameSound({
    src: ['/snd/gusano-larrata.mp3'],
    preload: true,
  }),

  // Alien
  'alien-absorption': new GameSound({
    src: ['/snd/alien-absorption.mp3'],
    preload: true,
  }),
  'alien-protocols': new GameSound({
    src: ['/snd/alien-protocols.mp3'],
    preload: true,
  }),
  'alien-protocols2': new GameSound({
    src: ['/snd/alien-protocols2.mp3'],
    preload: true,
  }),
  'alien-printer': new GameSound({
    src: ['/snd/alien-printer.mp3'],
    preload: true,
  }),
  'alien-engineer': new GameSound({
    src: ['/snd/alien-engineer.mp3'],
    preload: true,
  }),
  'alien-transformation': new GameSound({
    src: ['/snd/alien-transformation.mp3'],
    preload: true,
  }),
  'alien-crocantes': new GameSound({
    src: ['/snd/alien-crocantes.mp3'],
    preload: true,
  }),
  'alien-dead': new GameSound({
    src: ['/snd/alien-dead.mp3'],
    preload: true,
  }),
  reptile: new GameSound({
    src: ['/snd/reptile.mp3'],
    preload: true,
  }),
  'gleta-howdareyou': new GameSound({
    src: ['/snd/gleta-howdareyou.mp3'],
    preload: true,
  }),
  'gleta-stolen': new GameSound({
    src: ['/snd/gleta-stolen.mp3'],
    preload: true,
  }),

  // Luladrao
  'luladrao-sindinero': new GameSound({
    src: ['/snd/luladrao-sindinero.mp3'],
    preload: true,
  }),
  'alberso-selva': new GameSound({
    src: ['/snd/alberso-selva.mp3'],
    preload: true,
  }),
  'luladrao-narrativa': new GameSound({
    src: ['/snd/luladrao-narrativa.mp3'],
    preload: true,
  }),
  'br-a1': new GameSound({
    src: ['/snd/br-a1.mp3'],
    preload: true,
  }),
  'br-a2': new GameSound({
    src: ['/snd/br-a2.mp3'],
    preload: true,
  }),
  'br-a3': new GameSound({
    src: ['/snd/br-a3.mp3'],
    preload: true,
  }),
  'br-b1': new GameSound({
    src: ['/snd/br-b1.mp3'],
    preload: true,
  }),
  'br-b2': new GameSound({
    src: ['/snd/br-b2.mp3'],
    preload: true,
  }),
  'br-b3': new GameSound({
    src: ['/snd/br-b3.mp3'],
    preload: true,
  }),

  // Others
  clone: new GameSound({
    src: ['/snd/clone.mp3'],
    preload: true,
  }),
  'super-libertarian-effect': new GameSound({
    src: ['/snd/super-libertarian-effect.mp3'],
    preload: true,
  }),
  explosion: new GameSound({
    src: ['/snd/explosion.mp3'],
    preload: true,
    volume: 0.8,
  }),
};

const soundsKeys = Object.keys(sounds);

soundsKeys.forEach((key) => {
  sounds[key].on('loaderror', (id, err) => {
    console.error('Error loading sound', key, err);
  });
});

export const muteSounds = (group: SoundGroup, value: boolean) => {
  soundsKeys.forEach((key) => {
    const sound = sounds[key];

    if (sound.group !== group) {
      return;
    }

    sound.mute(value);
  });
};

export type soundKey = keyof typeof sounds;

export default sounds;
