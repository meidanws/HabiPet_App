using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Web;

/// <summary>
/// Summary description for Service
/// </summary>
public class Service
{
    public Service()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    //create succesful json 
    internal Dictionary<string, object> CreateSuccessRes()
    {
        Dictionary<string, object> res = new Dictionary<string, object>();
        res.Add("state", 1);
        return res;
    }

    //create error json
    internal Dictionary<string, object> CreateErrorRes(Exception ex)
    {
        Dictionary<string, object> res = new Dictionary<string, object>();
        res.Add("state", 0);
        res.Add("error", ex.Message);
        return res;
    }

    //convert dataTable to list of objects
    internal List<Dictionary<string, object>> ConvertDataTable(DataTable dt)
    {
        /* List<T> data = new List<T>();
         foreach (DataRow row in dt.Rows)
         {
             T item = GetItem<T>(row);
             data.Add(item);
         }
         return data;*/

        List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
        Dictionary<string, object> row;
        foreach (DataRow dr in dt.Rows)
        {
            row = new Dictionary<string, object>();
            foreach (DataColumn col in dt.Columns)
            {
                row.Add(col.ColumnName, dr[col]);
            }
            rows.Add(row);
        }

        return rows;
    }

    //get the row item according to the list type
   /* internal static T GetItem<T>(DataRow dr)
    {
        Type temp = typeof(T); // create item from type T
        T obj = Activator.CreateInstance<T>();
        
        foreach (PropertyInfo pro in temp.GetProperties())  // run on each property in object
        {
            foreach (DataColumn column in dr.Table.Columns) //run on each colume in Datarow
            {
                if (pro.Name == column.ColumnName)
                {
                    if (dr[column.ColumnName] != System.DBNull.Value) { // check if colume is null
                        pro.SetValue(obj, dr[column.ColumnName], null); // set property value in object 
                    }
                    break;
                }

                else
                    continue;
            }
        }
        return obj;
    }*/
}
