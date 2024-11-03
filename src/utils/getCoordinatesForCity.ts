const API_KEY = "2e05526b15464b0f88f7b9931aa2b771";

export const getCoordinatesForCity = async (city: string) => {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry; // Используем geometry для извлечения lat и lng

      return { lat, lon: lng }; // Преобразуем lng в lon для совместимости
    } else {
      throw new Error("Город не найден в результатах API");
    }
  } catch (error) {
    console.error("Ошибка получения координат:", error);
    return null;
  }
};
