using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for PathData
/// </summary>
public class PathData
{
    private readonly Database _db;

    public PathData()
    {
        _db = new Database();
    }

    internal DataTable InsertPath(string path,int serviceOnAirId)
    {
        string cmd = "Insert into [dbo].[Path]([PathString],[ServiceOnAirId]) Values ('" + path + "','" + serviceOnAirId + "');";
        return _db.ExecReader(cmd);
    }

    internal DataTable InsertActivity(int ActivityID, int serviceOnAirId, int Amount)
    {
        string cmd = "Exec InsertActivity "+ ActivityID + "," + serviceOnAirId + "," + Amount;
        return _db.ExecReader(cmd);
    }


    internal DataTable InsertImage(int serviceOnAirId, string image)
    {
        string cmd = "Exec InsertImageToReport " + serviceOnAirId + ",'" + image + "'";
        return _db.ExecReader(cmd);
    }

    internal DataTable GetCurrentReport(int serviceOnAirId)
    {
        string cmd = "Select * from [dbo].[v_GetCurrentReport] Where [ServiceOnAirId] =" + serviceOnAirId;
        return _db.ExecReader(cmd);
    }

}