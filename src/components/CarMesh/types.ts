enum CAR_PARTS {
    FLOOR = "floor",
    HOOD = "hood",
    FRONT_BUMPER = "front",
    LEFT_FRONT_DOOR = "front_left_door",
    LEFT_REAR_DOOR = "rear_left_door",
    LEFT_FRONT_FENDER = "front_left_fender",
    RIGHT_FRONT_DOOR = "front_right_door",
    RIGHT_FRONT_FENDER = "front_right_fender",
    RIGHT_REAR_DOOR = "rear_right_door",
    ROOF = "roof",
    REAR = "rear",
    TRUNK = "trunk",
    WINDSHIELD = "windshield",
    RIGHT_REAR_SIDE = "right_rear_side",
    LEFT_REAR_SIDE = "left_rear_side",
    LEFT_MIRROR = "left_mirror",
    RIGHT_MIRROR = "right_mirror",
}

type MaterialSetting = {
    roughness: number,
    mirror: number,
    metalness: number,
    color?: string
}
  
enum CarMaterialsTypes {
    PAINT = 'paint',
    RAW = 'raw',
    POLISHING = 'polishing'
}

const CAR_MATERIALS_SETTINGS: Record<CarMaterialsTypes, MaterialSetting> = {
    [CarMaterialsTypes.POLISHING]: {mirror: 0, roughness: 1, metalness: 0}, // Tinta fosca
    [CarMaterialsTypes.RAW]: {mirror: 0, roughness: 1, metalness: 0}, // Primer
    [CarMaterialsTypes.PAINT]: {mirror: 0, roughness: 0, metalness: 0.1} // Tinta brilhante
}

export {CAR_PARTS, CAR_MATERIALS_SETTINGS, CarMaterialsTypes}

export interface ISeparatedColors {
    value: CAR_PARTS[],
    color: string
  }
  