-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/U6QITl
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE `WorldMeats` (
    `Name` varchar  NOT NULL ,
    `Country` varchar  NOT NULL ,
    `Region` varchar  NULL ,
    `Description` text  NOT NULL ,
    PRIMARY KEY (
        `Name`
    )
);

CREATE TABLE `Wineries` (
    `Winery` varchar  NOT NULL ,
    `Web` varchar  NULL ,
    `Region` varchar  NULL ,
    `Country` varchar  NOT NULL ,
    PRIMARY KEY (
        `Winery`
    )
);

CREATE TABLE `Wines` (
    `Vintage` int  NOT NULL ,
    `Country` varchar  NOT NULL ,
    `County` varchar  NULL ,
    `Designation` varchar  NULL ,
    `Points` int  NOT NULL ,
    `Price` float  NOT NULL ,
    `Province` varchar  NOT NULL ,
    `Title` varchar  NOT NULL ,
    `Variety` varchar  NOT NULL ,
    `Winery` varchar  NOT NULL ,
    PRIMARY KEY (
        `Title`
    )
);

CREATE TABLE `WineCheesePairingData` (
    `WineExamples` varchar  NOT NULL ,
    `PopularCheese` varchar  NOT NULL ,
    PRIMARY KEY (
        `WineExamples`
    )
);

CREATE TABLE `Cheese` (
    `Name` varchar  NOT NULL ,
    `Type` varchar  NOT NULL ,
    `Country` varchar  NULL ,
    `Region` varchar  NULL ,
    PRIMARY KEY (
        `Name`
    )
);

CREATE TABLE `Countries` (
    `CountryID` int  NOT NULL ,
    `Country` varchar  NOT NULL ,
    PRIMARY KEY (
        `Country`
    )
);

ALTER TABLE `WorldMeats` ADD CONSTRAINT `fk_WorldMeats_Country` FOREIGN KEY(`Country`)
REFERENCES `Countries` (`Country`);

ALTER TABLE `Wines` ADD CONSTRAINT `fk_Wines_Country` FOREIGN KEY(`Country`)
REFERENCES `Countries` (`Country`);

ALTER TABLE `Wines` ADD CONSTRAINT `fk_Wines_Variety` FOREIGN KEY(`Variety`)
REFERENCES `WineCheesePairingData` (`WineExamples`);

ALTER TABLE `Wines` ADD CONSTRAINT `fk_Wines_Winery` FOREIGN KEY(`Winery`)
REFERENCES `Wineries` (`Winery`);

ALTER TABLE `WineCheesePairingData` ADD CONSTRAINT `fk_WineCheesePairingData_PopularCheese` FOREIGN KEY(`PopularCheese`)
REFERENCES `Cheese` (`Name`);

