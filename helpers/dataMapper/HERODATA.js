const CLASSES = {
  OFFENCE: 'Offense',
  DEFENCE: 'Defense',
  TANK: 'Tank',
  SUPPORT: 'Support'
};

const data = {
  all: {
    colors: {
      primary: "#fa9c1e",
      highlight: "#ffb757"
    }
  },
  ana: {
    class: CLASSES.SUPPORT,
    description: "Former second in command of Overwatch, Ana Amari uses her skills and expertise to defend her home and the people she cares for.",
    colors: {
      primary: "#ccc2ae",
      highlight: "#dcd5c7"
    }
  },
  bastion: {
    class: CLASSES.DEFENCE,
    description: "Once a frontline combatant in the Omnic Crisis, this curious Bastion unit now explores the world, fascinated by nature but wary of a fearful humanity.",
    colors: {
      primary: "#6e994d",
      highlight: "#82af5f"
    }
  },
  brigitte: {
    class: CLASSES.SUPPORT,
    description: "Brigitte Lindholm, squire to Reinhardt Wilhelm, is a former mechanical engineer who has decided to take up arms and fight on the front lines to protect those in need.",
    colors: {
      primary: "#e04e34",
      highlight: "#e56d57"
    }
  },
  doomfist: {
    class: CLASSES.OFFENCE,
    description: "One of the leaders of Talon, Doomfist is determined to plunge the world into a new conflict that he believes will make humanity stronger.",
    colors: {
      primary: "#e04e34",
      highlight: "#e56d57"
    }
  },
  dva: {
    class: CLASSES.TANK,
    description: "D.Va is a former professional gamer who now uses her skills to pilot a state-of-the-art mech in defense of her country.",
    colors: {
      primary: "#ff7fd1",
      highlight: "#ffa8e0"
    }
  },
  genji: {
    class: CLASSES.OFFENCE,
    description: "Genji Shimada has made peace with the cyborg body he once rejected, and in doing so, he has discovered a higher humanity.",
    colors: {
      primary: "#84fe01",
      highlight: "#98fe2a"
    }
  },
  hanzo: {
    class: CLASSES.DEFENCE,
    description: "Mastering his skills as a bowman and an assassin, Hanzo Shimada strives to prove himself as a warrior without peer.",
    colors: {
      primary: "#938848",
      highlight: "#ada057"
    }
  },
  junkrat: {
    class: CLASSES.DEFENCE,
    description: "Junkrat is an explosives-obsessed freak who lives to cause chaos and destruction.",
    colors: {
      primary: "#d39308 ",
      highlight: "#f5ac0f"
    }
  },
  lucio: {
    class: CLASSES.SUPPORT,
    description: "Lúcio is an international celebrity and musician who inspires social change through his music and actions.",
    colors: {
      primary: "#8bec22",
      highlight: "#9ef048"
    }
  },
  mccree: {
    class: CLASSES.OFFENCE,
    description: "Armed with his Peacekeeper revolver, the outlaw Jesse McCree doles out justice on his own terms.",
    colors: {
      primary: "#8d3939",
      highlight: "#aa4545"
    }
  },
  mei: {
    class: CLASSES.DEFENCE,
    description: "Mei is a climatologist who has taken the fight to preserve the environment and protect the world into her own hands.",
    colors: {
      primary: "#9adbf4",
      highlight: "#bfe8f8"
    }
  },
  mercy: {
    class: CLASSES.SUPPORT,
    description: "A guardian angel to those who come under her care, Mercy is a peerless healer, a brilliant scientist, and a staunch advocate for peace.",
    colors: {
      primary: "#ffe16c",
      highlight: "#ffea95"
    }
  },
  moira: {
    class: CLASSES.SUPPORT,
    description: "Equal parts brilliant and controversial, Talon scientist Moira O'Deorain is on the cutting edge of genetic engineering, searching for a way to rewrite the fundamental building blocks of life.",
    colors: {
      primary: "#691ccf",
      highlight: "#7e30e3"
    }
  },
  orisa: {
    class: CLASSES.TANK,
    description: "Built from parts of one of Numbani's short-lived OR15 defense robots, Orisa is the city's newest protector, though she still has much to learn.",
    colors: {
      "primary": "#dc9a00",
      "highlight": "#ffb405"
    }
  },
  pharah: {
    class: CLASSES.OFFENCE,
    description: "Pharah's commitment to duty runs in her blood. She comes from a long line of highly decorated soldiers and burns with the desire to serve with honor.",
    colors: {
      primary: "#1b65c6",
      highlight: "#2778e2"
    }
  },
  reaper: {
    class: CLASSES.OFFENCE,
    description: "Some speak of a black-robed terrorist known only as the Reaper. His identity and motives are a mystery. What is known is that where he appears, death follows.",
    colors: {
      primary: "#272725",
      highlight: "#3c3c39"
    }
  },
  reinhardt: {
    class: CLASSES.TANK,
    description: "Reinhardt Wilhelm styles himself as a champion of a bygone age, who lives by the knightly codes of valor, justice, and courage.",
    colors: {
      primary: "#aa958e",
      highlight: "#bbaba5"
    }
  },
  roadhog: {
    class: CLASSES.TANK,
    description: "Roadhog is a ruthless killer with a well-earned reputation for cruelty and wanton destruction.",
    colors: {
      primary: "#c09477 ",
      highlight: "#cdaa93"
    }
  },
  "soldier-76": {
    class: CLASSES.OFFENCE,
    description: "Currently the target of an international manhunt, the vigilante known as Soldier: 76 wages a personal war to expose the truth behind Overwatch's collapse.",
    colors: {
      primary: "#5870b6",
      highlight: "#7588c3"
    }
  },
  sombra: {
    class: CLASSES.OFFENCE,
    description: "One of the world's most notorious hackers, Sombra uses information to manipulate those in power.",
    colors: {
      primary: "#751b9c",
      highlight: "#9021bf"
    }
  },
  symmetra: {
    class: CLASSES.SUPPORT,
    description: "Symmetra literally bends reality. By manipulating hard-light constructs, she crafts the world as she wishes it to be, in hopes of engineering a perfect society.",
    colors: {
      primary: "#5cecff",
      highlight: "#85f1ff"
    }
  },
  torbjorn: {
    class: CLASSES.DEFENCE,
    description: "At its height, Overwatch possessed one of the most advanced armaments on the planet, which could be traced to the workshop of an ingenious engineer named Torbjörn Lindholm.",
    colors: {
      primary: "#ff6200",
      highlight: "#ff7b28"
    }
  },
  tracer: {
    class: CLASSES.OFFENCE,
    description: "The former Overwatch agent known as Tracer is a time-jumping adventurer and an irrepressible force for good.",
    colors: {
      primary: "#f8911b",
      highlight: "#faa443"
    }
  },
  widowmaker: {
    class: CLASSES.DEFENCE,
    description: "Widowmaker is the perfect assassin: a patient, ruthlessly efficient killer who shows neither emotion nor remorse.",
    colors: {
      primary: "#6f6fae",
      highlight: "#8a8abd"
    }
  },
  winston: {
    class: CLASSES.TANK,
    description: "A super-intelligent, genetically engineered gorilla, Winston is a brilliant scientist and a champion for humanity's potential.",
    colors: {
      primary: "#4c505c",
      highlight: "#5f6472"
    }
  },
  zarya: {
    class: CLASSES.TANK,
    description: "Zarya is one of the world's strongest women, a celebrated athlete who sacrificed personal glory to protect her family, friends, and country in a time of war.",
    colors: {
      primary: "#f571a8",
      highlight: "#f897bf"
    }
  },
  zenyatta: {
    class: CLASSES.SUPPORT,
    description: "Zenyatta is an omnic monk who wanders the world in search of spiritual enlightenment. It is said that those who cross his path are never the same again.",
    colors: {
      primary: "#c79c00",
      highlight: "#f0bc00"
    }
  }
};

module.exports = data;
