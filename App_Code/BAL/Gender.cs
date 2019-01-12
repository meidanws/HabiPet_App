using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Gender
/// </summary>
public class Gender
{
    public Gender()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public Gender(int genderId, string genderName)
    {
        GenderId = genderId;
        GenderName = genderName;
    }

    public int GenderId { get; set; }
    public string GenderName { get; set; }
}