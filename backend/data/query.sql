use chemo_autos;

db.createCollection("cars");

db.cars.insertMany([
    {
        name: "Chevrolet Camaro ZL1 Panther",
        description: "Año: 2024",
        price: 2314900,
        image: "https://via.placeholder.com/300"
    },
    {
        name: "Ford Mustang GT",
        description: "Año: 2025",
        price: 1150000,
        image: "https://via.placeholder.com/300"
    },
    {
        name: "Porsche 911 Carrera",
        description: "Año: 2025",
        price: 2500000,
        image: "https://via.placeholder.com/300"
    },
    {
        name: "BMW M4 Competition",
        description: "Año: 2025",
        price: 2300000,
        image: "https://via.placeholder.com/300"
    },
    {
        name: "SUBARU BRZ Limited 6MT",
        description: "Año: 2024",
        price: 769900,
        image: "https://via.placeholder.com/300"
    },
    {
        name: "Nissan Z Touring AT",
        description: "Año: 2024",
        price: 1377900,
        image: "https://via.placeholder.com/300"
    },
    {
        name: "Ford Fiesta S",
        description: "Año: 2019",
        price: 152500,
        image: "https://via.placeholder.com/300"
    },
    {
        name: "MAZDA 3 SEDÁN",
        description: "Año: 2025",
        price: 403900,
        image: "https://via.placeholder.com/300"
    },
    {
        name: "Honda Civic",
        description: "Año: 2025",
        price: 590900,
        image: "https://via.placeholder.com/300"
    }
]);