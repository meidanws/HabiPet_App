using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Pet
/// </summary>
public class Pet
{
    public Pet()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public Pet(int petId, string petName, int gender, int ownerId, int typeId, int breed, int size)
    {
        PetId = petId;
        PetName = petName;
        Gender.GenderId = gender;
        User.UserId = ownerId;
        AnimalType.TypeId = typeId;
        Breed.BreedId = breed;
        Size.SizeId = size;
    }

    public Pet(int petId, string petName, int gender, int ownerId, int typeId, int breed, int size, string imgPath, string description)
    {
        PetId = petId;
        PetName = petName;
        Gender.GenderId = gender;
        User.UserId = ownerId;
        AnimalType.TypeId = typeId;
        Breed.BreedId = breed;
        Size.SizeId = size;
        ImgPath = imgPath;
        Description = description;
    }

    public Pet(int petId, string imgPath)
    {
        PetId = petId;
        ImgPath = imgPath;
    }

    public int PetId { get; set; }
    public string PetName { get; set; }
    public Gender Gender { get; set; }
    public int GenderId { get; set; }
    public User User { get; set; }
    public int UserId { get; set; }
    public Animal AnimalType { get; set; }
    public Animal TypeId { get; set; }
    public Breed Breed { get; set; }
    public int BreddId { get; set; }
    public Size Size { get; set; }
    public int SizeId { get; set; }
    public string ImgPath { get; set; }
    public string Description { get; set; }
}