import type { SpeakerProduct } from "../types/speaker-product.type";

const spearksProducts = new Map<number, SpeakerProduct>();

spearksProducts.set(19, {
  name: "HP S9500 BLUETOOTH WIRELESS SPEAKER",
  price: 200.0,
  color: "GRAY",
  category: "SPEAKERS",
  id: 19,
  compatibility: "Any device that has bluetooth enabled",
  connector: "Wireless",
  manufacturer: "HP",
  weight: "1.95 lb",
  wirelessTechnology: "Bluetooh®",
});

spearksProducts.set(20, {
  name: "BOSE SOUNDLINK BLUETOOTH SPEAKER III",
  price: 269.99,
  color: "BLACK",
  category: "SPEAKERS",
  id: 20,
  compatibility: "Any device that has bluetooth enabled",
  connector: "Wireless",
  manufacturer: "Bose",
  weight: "3.03 lb",
  wirelessTechnology: "Bluetooh®",
});

spearksProducts.set(21, {
  name: "HP ROAR PLUS WIRELESS SPEAKER",
  price: 169.99,
  color: "PURPLE",
  category: "SPEAKERS",
  id: 21,
  compatibility: "Any device that has bluetooth enabled",
  connector: "Wireless",
  manufacturer: "HP",
  weight: "1.26 lb",
  wirelessTechnology: "Bluetooh®",
});

spearksProducts.set(22, {
  name: "HP ROAR WIRELESS SPEAKER",
  price: 84.99,
  color: "BLUE",
  category: "SPEAKERS",
  id: 22,
  compatibility: "Any device that has bluetooth enabled",
  connector: "Wireless",
  manufacturer: "HP",
  weight: "1.1 lb",
  wirelessTechnology: "Bluetooh®",
});

spearksProducts.set(23, {
  name: "LOGITECH X100 SPEAKER SYSTEM - WIRELESS SPEAKER(S)",
  price: 49.99,
  color: "BLACk",
  category: "SPEAKERS",
  id: 23,
  compatibility: "Any device that has bluetooth enabled",
  connector: "Wireless",
  manufacturer: "Logitech",
  weight: "1.0 lb",
  wirelessTechnology: "Bluetooh®",
});

spearksProducts.set(24, {
  name: "HP ROAR MINI WIRELESS SPEAKER",
  price: 44.99,
  color: "YELLOW",
  category: "SPEAKERS",
  id: 24,
  compatibility:
    "Any device that has bluetooth enabled or a 3.5 mm audio connector.",
  connector: "Wireless",
  manufacturer: "HP",
  weight: "0.55 lb",
  wirelessTechnology: "Bluetooh®",
});

spearksProducts.set(25, {
  name: "BOSE SOUNDLINK WIRELESS SPEAKER",
  price: 129.0,
  color: "RED",
  category: "SPEAKERS",
  id: 25,
  compatibility:
    "Any device that has bluetooth enabled or a 3.5 mm audio connector.",
  connector: "Wireless",
  manufacturer: "Bose",
  weight: "1.25 lb",
  wirelessTechnology: "Bluetooh®",
});

export { spearksProducts };
