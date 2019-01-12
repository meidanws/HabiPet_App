using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for GenderData
/// </summary>
public class GenderData
{

    private readonly Database _db;

    public GenderData()
    {
        _db = new Database();
    }

    internal DataTable GetAllGenders()
    {
        string cmd = "select * from Gender";
        return _db.ExecReader(cmd);
    }
}