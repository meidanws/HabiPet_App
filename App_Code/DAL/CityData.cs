using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for CityData
/// </summary>
public class CityData
{

    private readonly Database _db;

    public CityData()
    {
        _db = new Database();
    }

    internal DataTable GetAllCitys()
    {
        string cmd = "select * from City";
        return _db.ExecReader(cmd);
    }
}