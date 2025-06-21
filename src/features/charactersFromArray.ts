import { getCharacterByUrl } from "../api/api";

export const loadCharacterNames = async (array:string[]) => {

      try {
        const namePromises = array.map(async (url: string) => {
          const response = await getCharacterByUrl(url);
          return response.data.name;
        });

        const names = await Promise.all(namePromises);
        return names;
      } catch (error) {
        console.error("Failed to load character names", error);
      }
    };