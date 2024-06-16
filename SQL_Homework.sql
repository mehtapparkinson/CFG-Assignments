/* This script sets up a database for managing library inventories, member information, and book loan.
It creates tables for books, members, and loans, and inserts sample data into these tables. 
The script also includes various queries to get information about available books, member borrowings, average book prices by genre, and not returned loans. 
Additionally, it demonstrates how to add new books and members, add new borrowings, 
and identify members who have not returned their books on time. */


CREATE TABLE Books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    author VARCHAR(300) NOT NULL,
    genre VARCHAR(200) NOT NULL,
    publish_year INT NOT NULL,
    price DECIMAL(4,2) NOT NULL,
    total_quantity INT NOT NULL,
    avaible_quantity INT NOT NULL
);

CREATE TABLE Members (
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    membership_date DATE NOT NULL
);

CREATE TABLE Loans (
    loan_id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    member_id INT NOT NULL,
    loan_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE,
    FOREIGN KEY (book_id) REFERENCES Books(book_id),
    FOREIGN KEY (member_id) REFERENCES Members(member_id)
);

INSERT INTO Books (title, author, genre, publish_year, price, total_quantity, avaible_quantity) VALUES
('Dukan Diyeti', 'Pierre Dukan', 'Health', 2010, 24.25, 5, 3),
('Kafamda Bir Tuhaflık', 'Orhan Pamuk', 'Fiction', 2014, 41.20, 10, 8),
('Oyuncu Anne', 'Şermin Yaşar', 'Parenting', 2015, 77.90, 6, 4),
('Ve Dağlar Yankılandı', 'Khaled Hosseini', 'Fiction', 2013, 86.45, 8, 6),
('Şah ve Sultan', 'İskender Pala', 'Historical Fiction', 2010, 52.55, 7, 5),
('Allah De Ötesini Bırak', 'Uğur Koşar', 'Self-Help', 2012, 11.60, 10, 7),
('Kralların Çarpışması Kısım 2', 'George R. R. Martin', 'Fantasy', 1998, 20.81, 8, 6),
('Can Boğazdan Çıkar', 'Mehmet Ali Bulut', 'Health', 2013, 14.40, 5, 3);

INSERT INTO Members (first_name, last_name, email, phone_number, membership_date) VALUES
('Ahmet', 'Yılmaz', 'ahmet@gmail.com', '123456789', '2020-01-01'),
('Ayşe', 'Kaya', 'ayşe@gmail.com', '987654321', '2021-02-15'),
('Mehmet', 'Demir', 'mehmet@gmail.com', '234567891', '2019-03-20'),
('Fatma', 'Şahin', 'fatma@gmail.com', '876543219', '2020-04-25'),
('Emre', 'Çelik', 'emre@gmail.com', '345678912', '2021-05-30'),
('Elif', 'Öztürk', 'elif@gmail.com', '765432198', '2018-06-10'),
('Mustafa', 'Arslan', 'mustafa@gmail.com', '456789123', '2020-07-05'),
('Zeynep', 'Koç', 'zeynep@gmail.com', '654321987', '2021-08-15');

INSERT INTO Loans (book_id, member_id, loan_date, due_date, return_date) VALUES
(1, 2, '2023-01-01', '2024-01-15', NULL),
(2, 1, '2023-02-01', '2024-02-15', '2023-02-10'),
(3, 4, '2023-03-01', '2024-03-15', NULL),
(4, 3, '2023-04-01', '2024-04-15', NULL),
(5, 5, '2023-05-01', '2024-05-15', '2023-05-10'),
(6, 6, '2023-06-01', '2024-06-15', NULL),
(7, 8, '2023-07-01', '2023-07-15', '2023-07-10'),
(8, 7, '2023-08-01', '2023-08-15', NULL),
(3, 1, '2023-02-01', '2024-02-15', '2023-02-10');

-- show all tables
SELECT * FROM Books ORDER BY title;
SELECT * FROM Members ORDER BY first_name;
SELECT * FROM Loans ORDER BY loan_date DESC;

-- Show books that are avaible in descending order
SELECT title, author, genre, avaible_quantity
FROM Books
WHERE avaible_quantity > 0
ORDER BY avaible_quantity DESC;

-- Show members and which book they borrowed
SELECT Members.first_name, Members.last_name, Books.title
FROM Members
JOIN Loans ON Members.member_id = Loans.member_id
JOIN Books ON Loans.book_id = Books.book_id
ORDER BY Members.last_name, Members.first_name;

-- Show average price of books in each genre
SELECT genre, AVG(price) AS average_price
FROM Books
GROUP BY genre;

-- Show which book a spesific member borrowed
SELECT Books.title, Loans.loan_date, Loans.due_date, Loans.return_date
FROM Loans
JOIN Members ON Loans.member_id = Members.member_id
JOIN Books ON Loans.book_id = Books.book_id
WHERE Members.first_name = 'Ahmet' AND Members.last_name = 'Yılmaz'
ORDER BY Loans.loan_date;

-- Show members and their borrow counts
SELECT 
    CONCAT(Members.first_name, ' ', Members.last_name) AS full_name, 
    UPPER(Members.email) AS email_uppercase, 
    COUNT(Loans.loan_id) AS borrow_count
FROM Members
LEFT JOIN Loans ON Members.member_id = Loans.member_id
GROUP BY Members.member_id
ORDER BY borrow_count DESC, Members.last_name, Members.first_name;

-- Delete a row from loans
DELETE FROM Loans WHERE loan_id = 5;


-- librarian adds another book
INSERT INTO Books (title, author, genre, publish_year, price, total_quantity, avaible_quantity)
VALUES ('Küçük Prens', 'Antoine de Saint-Exupéry','Children', 1943, 15.00, 12, 10);

-- librarian adds another member
INSERT INTO Members (first_name, last_name, email, phone_number, membership_date)
VALUES ('Burcu', 'Yılmaz', 'burcu@gmail.com', '998877665', CURDATE());

-- librarian adds the borrowing to the system
INSERT INTO Loans (book_id, member_id, loan_date, due_date, return_date)
VALUES (
    (SELECT book_id FROM Books WHERE title = 'Küçük Prens'),
    (SELECT member_id FROM Members WHERE email = 'burcu@gmail.com'),
    CURDATE(),
    DATE_ADD(CURDATE(), INTERVAL 14 DAY),
    NULL
);


-- Who did not return their books?
DELIMITER //

CREATE PROCEDURE people_not_returned_books()
BEGIN
    SELECT 
        Members.first_name,
        Members.last_name,
        Members.email,
        Books.title,
        Loans.loan_date,
        Loans.due_date
    FROM 
        Members
    JOIN 
        Loans ON Members.member_id = Loans.member_id
    JOIN 
        Books ON Loans.book_id = Books.book_id
    WHERE 
        Loans.return_date IS NULL AND Loans.due_date < CURDATE();
END //

DELIMITER ;

CALL people_not_returned_books()
