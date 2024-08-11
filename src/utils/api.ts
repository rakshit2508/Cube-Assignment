import axios from 'axios';



// Function to fetch and store images if they are not already in local storage
export const fetchAndStoreImages = async () => {
  const storedImages = localStorage.getItem('allImages');
  
  if (storedImages) {
    return; // Images are already stored, no need to fetch
  }

  try {
    const response = await axios.get(`https://api.unsplash.com/photos?per_page=100&client_id=Aqlxo8XT9Av0sje7GqYiXAWUkZGOrESWazRZlktIivo`);
    const images = response.data.map((img: any) => ({
      url: img.urls.small,
      id: img.id,
    }));
    localStorage.setItem('allImages', JSON.stringify(images));
  } catch (err) {
    console.error('Error fetching images:', err);
  }
};

// Function to get random images from local storage
export const getRandomImages = (count: number = 9) => {
  const allImages = JSON.parse(localStorage.getItem('allImages') || '[]');
  return allImages.sort(() => 0.5 - Math.random()).slice(0, count).map((img: any) => img.url);
};


// Function to fetch random customer data
export const fetchCustomers = async () => {
  const response = await axios.get('https://randomuser.me/api/?results=1000');
  return response.data.results.map((user: any) => ({
    id: user.login.uuid,
    name: {
      first: user.name.first,
      last: user.name.last,
      title: user.name.title,
    },
    location: {
      street: { name: user.location.street.name },
      city: user.location.city,
      state: user.location.state,
    },
    paragraph: `This is a sample paragraph for customer ${user.name.first} ${user.name.last}.`,
  }));
};

