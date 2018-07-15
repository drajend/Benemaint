using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;
using System.Xml.Linq;
using System.Web.Mvc;

namespace Benemaint.Utilities
{
    public class CommonUtilities
    {
        public static XmlDocument doc;

        string jsonNoResult = "{ \"data\":\"\" }";
        string jsonNoDataResult = "{ \"data\":[\"name\": \"RESULT\", \"value\":\"NODATA\"]}";
        string jsonMultipleDataResult = "{ \"data\":[\"FieldName\": \"RESULT\", \"FieldValue\":\"Multiple Results\"]}";
        string chargerPolicyResult = "{ \"data\":[\"name\": \"RESULT\", \"value\":\"CHARGER\"]}";

        public List<SelectListItem> ExtractLOBFields(string searchType)
        {
            string value = string.Empty;
            string binPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "App_Data\\LOBFields.xml");

                XDocument xdoc = XDocument.Load(binPath);
                var SListItem =
                                (
                                    from xmlSList in xdoc.Descendants(searchType)
                                    from listItem in xmlSList.Elements("Item")
                                    select new SelectListItem
                                    {
                                        Value = listItem.Attribute("key").Value,
                                        Text = listItem.Attribute("value").Value
                                    }
                                ).ToList();

            return SListItem;
        }

        public string JSonNoData()
        {
            return jsonNoResult;
        }

        public string JSonNoDataResult()
        {
            return jsonNoDataResult;
        }

        public string JsonMultipleDataResult()
        {
            return jsonMultipleDataResult;
        }
        
        public string JSonChargerPolicy()
        {
            return chargerPolicyResult;
        }
        
        public static string GetEnumValue(string sectionName, string itemName, string key)
        {
            string value = string.Empty;
            string binPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "App_Data\\Action.xml");

            try
            {
                if (!string.IsNullOrWhiteSpace(itemName))
                {
                    if (doc == null)
                    {
                        doc = new XmlDocument();
                        doc.Load(binPath);
                    }
                    else
                    {
                        doc = null;
                        doc = new XmlDocument();
                        doc.Load(binPath);
                    }
                    string template = "/Benemaint/{0}/{1}/Item[@key='{2}']";
                    string search = string.Format(template, sectionName, itemName, key);
                    XmlNode item;
                    XmlElement root = doc.DocumentElement;
                    item = root.SelectSingleNode(search);
                    value = (item != null ? item.Attributes["value"].Value : string.Empty);
                }

            }
            catch (System.Exception ex)
            {
                throw ex;
            }
            return value;
        }
        
        public string GetEnumValueLOBFields(string sectionName, string itemName, string key)
        {
            string value = string.Empty;
            string binPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "App_Data\\LOBFields.xml");

            try
            {
                if (!string.IsNullOrWhiteSpace(itemName))
                {
                    if (doc == null)
                    {
                        doc = new XmlDocument();
                        doc.Load(binPath);
                    }
                    else
                    {
                        doc = null;
                        doc = new XmlDocument();
                        doc.Load(binPath);
                    }
                    string template = "/{0}/{1}/Item[@key='{2}']";
                    string search = string.Format(template, sectionName, itemName, key);
                    XmlNode item;
                    XmlElement root = doc.DocumentElement;
                    item = root.SelectSingleNode(search);
                    value = (item != null ? item.Attributes["value"].Value : string.Empty);
                }

            }
            catch (System.Exception ex)
            {
                throw ex;
            }
            return value;
        }
    }
}