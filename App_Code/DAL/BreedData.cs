using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for BreedData
/// </summary>
public class BreedData
{
    private readonly Database _db;

    public BreedData()
    {
        _db = new Database();
    }

    internal DataTable GetAllBreeds()
    {
        string cmd = "select * from Breed";
        return _db.ExecReader(cmd);
    }
}