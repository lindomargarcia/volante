import { CAR_PARTS, ISeparatedColors } from "../CarMesh/types";
import { IDamage, SEVERITY_COLORS, SEVERITY_STATUS } from "./types";

export const getSeparatedColorsByDamageSeverity = (damageList: IDamage[]): ISeparatedColors[] =>
damageList.length === 0
? []
: damageList.map((damage) => ({
    value: damage.car_parts,
    color: SEVERITY_COLORS[damage.severity],
    }));

export const reduceDamagedCarParts = (damageList: IDamage[]) => damageList.reduce((acc: CAR_PARTS[], item: IDamage) => acc.concat(item.car_parts),[]);

export const getDamageList = (damageList: IDamage[], selectedCarPart: CAR_PARTS, severity: SEVERITY_STATUS) => {
    let isNewSeverity = true;
    let updatedDamageList: IDamage[] = [];

    damageList.forEach((damage: IDamage) => {
      let updatedDamage = { ...damage };
      let isRemovingCarPart = false;

      updatedDamage.car_parts = updatedDamage.car_parts.filter((carPart) => {
        const isSelectedCarPart = carPart === selectedCarPart
        if (isSelectedCarPart) isRemovingCarPart = true;
        return !isSelectedCarPart
      });

      if (damage.severity === severity) {
        isNewSeverity = false;
        if (!isRemovingCarPart) updatedDamage.car_parts.push(selectedCarPart);
      }

      if (updatedDamage?.car_parts?.length > 0) {
        updatedDamageList.push(updatedDamage);
      }
    });

    if (isNewSeverity) {
      updatedDamageList.push({ severity, car_parts: [selectedCarPart] });
    }

    return updatedDamageList;
};