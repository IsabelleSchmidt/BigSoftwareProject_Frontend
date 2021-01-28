import { reactive, computed } from 'vue'

const state = reactive({
    german: new Map<string,string>([
        //ProductTypes
        ["stuhl", "chair"],
        ["pflanze", "plant"],
        ["tisch", "table"],
        ["bett", "bed"],
        ["dekoration", "decoration"],
        ["schrank", "closet"],
        ["kommode", "closet"],
        ["sofa", "couch"],
        //RoomTypes
        ["bad", "bathroom"],
        ["schlafzimmer", "bedroom"],
        ["küche", "kitchen"],
        ["wohnküche", "kitchen"],
        ["kinderzimmer", "children"],
        ["arbeitszimmer", "bureau"],
        ["esszimmer", "diningroom"],
        ["wohnzimmer", "livingroom"]
    ])
});

export function useLanguage() {
    return {
        germanTranslation: computed(() => state.german)
    }
}