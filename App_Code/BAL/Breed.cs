using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Breed
/// </summary>
public class Breed
{
    public Breed()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public Breed(int breedId, string name, int animalTypeId)
    {
        BreedId = breedId;
        Name = name;
        AnimalType.TypeId = animalTypeId;
    }

    public int BreedId { get; set; }
    public string Name { get; set; }
    public Animal AnimalType { get; set; }
    public int TypeId { get; set; }

}