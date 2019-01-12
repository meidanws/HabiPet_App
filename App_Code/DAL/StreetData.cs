using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for StreetData
/// </summary>
public class StreetData
{
    private readonly Database _db;

    public StreetData()
    {
        _db = new Database();
    }

    internal DataTable GetAllStreets()
    {
        string cmd = "select * from Street";
        return _db.ExecReader(cmd);
    }
}