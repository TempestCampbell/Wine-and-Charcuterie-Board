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
    `Wine` varchar  NOT NULL ,
    `CheeseName` varchar  NOT NULL ,
    PRIMARY KEY (
        `Wine`
    )
);

CREATE TABLE `CheeseData` (
    `Cheeseid` int  NOT NULL ,
    `Name` varchar  NOT NULL ,
    `Regionid` int  NULL ,
    PRIMARY KEY (
        `Name`
    )
);

CREATE TABLE `Flavorlookups` (
    `Cheeseid` int  NOT NULL ,
    `Flavorid` int  NOT NULL ,
    PRIMARY KEY (
        `Cheeseid`
    )
);

CREATE TABLE `CheeseFlavors` (
    `Flavorid` int  NOT NULL ,
    `Name` varchar  NOT NULL ,
    PRIMARY KEY (
        `Flavorid`
    )
);

ALTER TABLE `Wines` ADD CONSTRAINT `fk_Wines_Variety` FOREIGN KEY(`Variety`)
REFERENCES `WineCheesePairingData` (`Wine`);

ALTER TABLE `Wines` ADD CONSTRAINT `fk_Wines_Winery` FOREIGN KEY(`Winery`)
REFERENCES `Wineries` (`Winery`);

ALTER TABLE `WineCheesePairingData` ADD CONSTRAINT `fk_WineCheesePairingData_CheeseName` FOREIGN KEY(`CheeseName`)
REFERENCES `CheeseData` (`Name`);

ALTER TABLE `CheeseData` ADD CONSTRAINT `fk_CheeseData_Cheeseid` FOREIGN KEY(`Cheeseid`)
REFERENCES `Flavorlookups` (`Cheeseid`);

ALTER TABLE `Flavorlookups` ADD CONSTRAINT `fk_Flavorlookups_Flavorid` FOREIGN KEY(`Flavorid`)
REFERENCES `CheeseFlavors` (`Flavorid`);

