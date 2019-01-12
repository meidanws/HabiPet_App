using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for AnimalData
/// </summary>
public class AnimalData
{
    private readonly Database _db;

    public AnimalData()
    {
        _db = new Database();
    }

    internal DataTable GetAnimalType()
    {
        string cmd = "select * from AnimalType";
        return _db.ExecReader(cmd);
    }
}