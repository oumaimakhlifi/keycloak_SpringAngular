-- Sélectionner la base de données cible
USE customer;

-- Création de la table `customers` pour stocker les informations des clients
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,       -- Identifiant unique du client
    first_name VARCHAR(50) NOT NULL,         -- Prénom du client
    last_name VARCHAR(50) NOT NULL,          -- Nom de famille du client
    email VARCHAR(100) UNIQUE NOT NULL,      -- Adresse e-mail unique
    phone VARCHAR(15),                       -- Numéro de téléphone
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Date de création
);

-- Insérer des données de démonstration dans la table `customers`
INSERT INTO customers (first_name, last_name, email, phone) VALUES
('Alice', 'Johnson', 'alice.johnson@example.com', '1234567890'),
('Bob', 'Smith', 'bob.smith@example.com', '0987654321'),
('Charlie', 'Brown', 'charlie.brown@example.com', '1122334455');

