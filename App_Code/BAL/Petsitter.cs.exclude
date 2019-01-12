using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Petsitter
/// </summary>
public class Petsitter: User
{
    public Petsitter()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    //public Petsitter(bool isAvailable)
    //{
    //    IsAvailable = isAvailable;
    //}

    public bool IsVisable { get; set; }
    public string About { get; set; }
    public decimal Rate { get; set; }
    public List<ServiceForPetsitter> PriceList { get; set; }
    public List<PetsitterReviews> PetsitterReviews { get; set; }
    public string CityName { get; set; }
}

public class SearchPetsitter:Petsitter
{
    //public decimal Rate { get; set; }
    //public string CityName { get; set; }
    public string StreetName { get; set; }
    public decimal Price { get; set; }

}

public class ServiceForPetsitter 
{
    public int ServiceId { get; set; }
    public string ServiceName { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
}

public class PetsitterReviews:User
{
    public DateTime Timestamp { get; set; }
    public string ReviewText { get; set; }
    //public int UserId { get; set; }
    public int Rate { get; set; }
}