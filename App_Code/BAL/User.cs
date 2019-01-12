﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for User
/// </summary>
public class User
{
    public User()
    {
        //
        // TODO: Add constructor logic here
        //
    }


    public User(string firstName, string lastName, string email, string password)
    {
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        Password = password;
    }

    public User(string email, string password)
    {
        Email = email;
        Password = password;
    }

    public int UserId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime BirthDate { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Gender { get; set; }
    public string ImgPath { get; set; }
    public City City { get; set; }
    public int CityId { get; set; }
    public string Street { get; set; }
    public int StreetId { get; set; }
    public int HouseNumber { get; set; }
    public int ReviewCount { get; set; }
    public List<Pet> UserPets { get; set; }
    public List<ReviewsForUser> UserReviews { get; set; }

}

public class ReviewsForUser
{
    public int ReviewId { get; set; }
    public string TimeStamp { get; set; }
    public string ReviewText { get; set; }
    public int UserId { get; set; }
    public int PetsitterId { get; set; }
    public decimal Rate { get; set; }
}