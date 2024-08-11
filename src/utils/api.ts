import axios from 'axios';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY; // Adjusted to VITE_UNSPLASH_ACCESS_KEY for Vite

// Function to fetch and store images if they are not already in local storage
export const fetchAndStoreImages = async () => {
  const storedImages = localStorage.getItem('allImages');
  
  if (storedImages) {
    return; // Images are already stored, no need to fetch
  }

  try {
    const response = await axios.get(`https://api.unsplash.com/photos?per_page=100&client_id=${UNSPLASH_ACCESS_KEY}`);
    const images = response.data?.map((img: any) => ({
      url: img?.urls?.small,
      id: img?.id,
    }));
    localStorage.setItem('allImages', JSON.stringify(images));
  } catch (err) {
    console.error('Error fetching images:', err);
  }
};

// Function to get random images from local storage
export const getRandomImages = (count: number = 9) => {
  try {
    const allImages = JSON.parse(localStorage.getItem('allImages') || '[]');
    return allImages
      ?.sort(() => 0.5 - Math.random())
      .slice(0, count)
      .map((img: any) => img?.url) || [];
  } catch (err) {
    console.error('Error getting random images:', err);
    return [];
  }
};

// Function to fetch random customer data
export const fetchCustomers = async () => {
  try {
    const response = await axios.get('https://randomuser.me/api/?results=1000');
    return response.data?.results?.map((user: any) => ({
      id: user?.login?.uuid,
      name: {
        first: user?.name?.first,
        last: user?.name?.last,
        title: user?.name?.title,
      },
      location: {
        street: { name: user?.location?.street?.name },
        city: user?.location?.city,
        state: user?.location?.state,
      },
      paragraph: `This is a sample paragraph for customer ${user?.name?.first} ${user?.name?.last}.
      ${user?.name?.first} is an individual with a diverse background in various fields.`,
    })) || [];
  } catch (err) {
    console.error('Error fetching customer data:', err);
    return [];
  }
};
