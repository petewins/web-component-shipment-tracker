import type { Components, JSX } from "../types/components";

interface ShipmentTrack extends Components.ShipmentTrack, HTMLElement {}
export const ShipmentTrack: {
    prototype: ShipmentTrack;
    new (): ShipmentTrack;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
