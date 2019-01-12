using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for SizeData
/// </summary>
public class SizeData
{
    private readonly Database _db;

    public SizeData()
    {
        _db = new Database();
    }

    internal DataTable GetAllSize()
    {
        string cmd = "select * from select * from Size";
        return _db.ExecReader(cmd);
    }
}