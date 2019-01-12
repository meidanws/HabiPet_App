using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for PetData
/// </summary>
public class PetData
{
    private readonly Database _db;

    public PetData()
    {
        _db = new Database();
    }

    internal DataTable GetAllPetDetails(int petId)
    {
        string cmd = "select * from pet where petId='"+ petId + "'";
        return _db.ExecReader(cmd);
    }
}