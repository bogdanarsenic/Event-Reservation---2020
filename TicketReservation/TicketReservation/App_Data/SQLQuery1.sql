/*CREATE TABLE Users(
Username NVARCHAR(50),
Password NVARCHAR(50),
Name NVARCHAR(30),
Surname NVARCHAR(30),
Gender NVARCHAR(10),
Role NVARCHAR(10),
DateOfBirth DATETIME2,
TicketsId NVARCHAR(50),
ManifestationId NVARCHAR(50),
Points INT,
UserType NVARCHAR(15),
PRIMARY KEY (Username)
);

CREATE TABLE Locations(
Id NVARCHAR(50),
Address NVARCHAR(20),
Lattitude float,
Longitude float,
PRIMARY KEY (Id)
);

CREATE TABLE Manifestations(
Id NVARCHAR(50),
Name NVARCHAR(50),
Type NVARCHAR(50),
Capacity INT,
EventTime DATETIME2,
Price INT,
Status NVARCHAR(50),
Place NVARCHAR(50),
Pictures NVARCHAR(300),
IsActive BIT,
PRIMARY KEY (Id)
);

CREATE TABLE Tickets(
Id NVARCHAR(50),
ManifestationId NVARCHAR(50),
EventTime DATETIME2,
Price INT,
Buyer NVARCHAR(50),
Status NVARCHAR(50),
Type NVARCHAR(15),
PRIMARY KEY (Id)
);

CREATE TABLE Comments(
Id NVARCHAR(50),
UserId NVARCHAR(50),
ManifestationId NVARCHAR(50),
Text NVARCHAR(100),
Rating INT,
IsActive BIT,
PRIMARY KEY (Id)
);*/
