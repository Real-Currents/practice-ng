USE AdventureWorks;

DROP PROCEDURE GetUserList;

CREATE PROCEDURE GetUserList ( @NumberOfUsers int )
AS
	SELECT TOP (@NumberOfUsers) p.FirstName, p.LastName, e.EmailAddress
		FROM Person.EmailAddress e INNER JOIN Person.Person p
		ON e.BusinessEntityID = p.BusinessEntityID
		ORDER BY e.EmailAddress;

EXEC GetUserList
	@NumberOfUsers = 10;
