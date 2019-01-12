using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Animal
/// </summary>
public class Animal
{
    public Animal()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public Animal(int typeId, string typeName, string imgPath)
    {
        TypeId = typeId;
        TypeName = typeName;
        ImgPath = imgPath;
    }

    public int TypeId { get; set; }
    public string TypeName { get; set; }
    public string ImgPath { get; set; }
}