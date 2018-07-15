using Benemaint.BLL;
using Benemaint.Utilities;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using static Benemaint.Model.ValicModel;

namespace Benemaint.Controllers
{
    public class BenemaintController : Controller
    {
        // GET: Benemaint
        BenemaintBusinessLayer searchSelect = new BenemaintBusinessLayer();
        CommonUtilities utils = new CommonUtilities();
        // GET: ValicAISearch
        public ActionResult Index()
        {
            var lobfields = utils.ExtractLOBFields("ValicLOBFields");

            var jsonLOBFields = new SelectList(lobfields, "Text", "Value");
            var jsonstr = JsonConvert.SerializeObject(jsonLOBFields).Replace(@"""Disabled"":false,""Group"":null,""Selected"":false,", "");
            ViewBag.LOBFields = jsonstr.Replace("[", "").Replace("]", "");

            return View();
        }

    
        [HttpGet]
        public String GetInfo(string ssn,string ssnType)
        {
            string jsonResult = string.Empty;
            string validatePolicy = string.Empty;
            List<string> lstProfile = new List<string>();
            ServiceLogger.log.Info("GetInfo Invoked: ssn:" + ssn + " ssnType:" + ssnType );

            try
            {
                if (String.IsNullOrEmpty(ssn) && String.IsNullOrEmpty(ssnType))
                {
                    jsonResult = utils.JSonNoData();
                }
                else
                {
                    DataTable dt = new DataTable();
                    dt = searchSelect.GetInfo(ssn, ssnType); 
                    jsonResult = JsonConvert.SerializeObject(dt);

                }

            }

            catch (Exception ex)
            {
                ServiceLogger.log.Error("GetInfo. Exception Error: ", ex);
            }
            finally
            {

            }
            jsonResult = jsonResult.Replace(@"[", "{ \"data\":[").Replace("]", "]}");

            return jsonResult;
            
        }

        [HttpGet]
        public String returnData(string tmpRemoved)
        {
            string jsonResult = tmpRemoved;
            return jsonResult;
        }

        [HttpGet]
        public String returnAccounts(string tmpAccounts)
        {
            string jsonResult = tmpAccounts;

            return jsonResult;
        }


        [HttpGet]
        public String returnTotals(string tmpTotals)
        {
            string jsonResult = tmpTotals;

            return jsonResult;
        }

        [HttpGet]
        public String GetBeneInfo(string ssn, string ssnType,string acctNo)
        {
            string jsonResult = string.Empty;
            string validatePolicy = string.Empty;
            List<string> lstProfile = new List<string>();
            ServiceLogger.log.Info("GetBeneInfo Invoked: ssn:" + ssn + " ssnType:" + ssnType + " acctNo:" + acctNo);

            try
            {
                if (String.IsNullOrEmpty(ssn) && String.IsNullOrEmpty(ssnType))
                {
                    jsonResult = utils.JSonNoData();
                }
                else
                {
                    DataTable dt = new DataTable();
                    dt = searchSelect.GetBeneInfo(ssn, ssnType,acctNo);
                    jsonResult = JsonConvert.SerializeObject(dt);

                }

            }

            catch (Exception ex)
            {
                ServiceLogger.log.Error("GetBeneInfo. Exception Error: ", ex);
            }
            finally
            {

            }
            jsonResult = jsonResult.Replace(@"[", "{ \"data\":[").Replace("]", "]}");

            return jsonResult;

        }

        [HttpPost]
        public String InsertBeneInfo(string ssn, string acctNo, String pBene, String cBene)
        {
            string jsonResult = string.Empty;
            string validatePolicy = string.Empty;
            List<string> lstProfile = new List<string>();
            String sDate = DateTime.Now.ToString("yyyy-MM-dd");
            String sTime = DateTime.Now.ToString("hh.mm.ss.ffffff");
            String beneCRDA = sDate + "-" + sTime;
            try
            {
                searchSelect.UpdateBeneInfo(ssn, acctNo);

                BeneList pBeneList = new JavaScriptSerializer().Deserialize<BeneList>(pBene);
                foreach (var item in pBeneList.data)
                {
                    BeneInfo beneInfo = new BeneInfo();

                    beneInfo.SSN = item.PTP_IDT;
                    beneInfo.SSN_Type = item.PTP_IDT_TYP_COD;
                    beneInfo.AcctNum = item.ACCT_NUM;
                    beneInfo.CRDA_BeneDte = beneCRDA;
                    beneInfo.Bene_Type = "P";
                    beneInfo.Bene_SSN = item.BENE_SSN_NUM;
                    beneInfo.Bene_Name = item.BENE_FULL_NAME;
                    beneInfo.Bene_DOB = item.BENE_DATE_OF_BIRTH;
                    beneInfo.Relationship = item.RELATIONSHIP_TO_PARTICIPANT;
                    beneInfo.bene_per = item.BENEFICIARY_PERCENT;
                    beneInfo.Multi_Bene = item.ADDITIONAL_BENE_FLAG;
                    beneInfo.userid = item.LAST_MAINT_USER;
                    beneInfo.bene_add1 = item.BENE_ADDRESS_1;
                    beneInfo.bene_add2 = item.BENE_ADDRESS_2;
                    beneInfo.bene_city = item.BENE_CITY;
                    beneInfo.bene_state = item.BENE_STATE;
                    beneInfo.bene_zip = item.BENE_ZIP_CODE;
                    beneInfo.bene_fzip = item.BENE_FOREIGN_ZIP_CODE;
                    beneInfo.Active_Bene = item.ACTIVE_BENE_FLAG;

                    searchSelect.InsertBeneInfo(beneInfo);
                }

                BeneList cBeneList = new JavaScriptSerializer().Deserialize<BeneList>(cBene);
                foreach (var item in cBeneList.data)
                {
                    BeneInfo cbeneInfo = new BeneInfo();

                    cbeneInfo.SSN = item.PTP_IDT;
                    cbeneInfo.SSN_Type = item.PTP_IDT_TYP_COD;
                    cbeneInfo.AcctNum = item.ACCT_NUM;
                    cbeneInfo.CRDA_BeneDte = beneCRDA;
                    cbeneInfo.Bene_Type = "C";
                    cbeneInfo.Bene_SSN = item.BENE_SSN_NUM;
                    cbeneInfo.Bene_Name = item.BENE_FULL_NAME;
                    cbeneInfo.Bene_DOB = item.BENE_DATE_OF_BIRTH;
                    cbeneInfo.Relationship = item.RELATIONSHIP_TO_PARTICIPANT;
                    cbeneInfo.bene_per = item.BENEFICIARY_PERCENT;
                    cbeneInfo.Multi_Bene = item.ADDITIONAL_BENE_FLAG;
                    cbeneInfo.userid = item.LAST_MAINT_USER;
                    cbeneInfo.bene_add1 = item.BENE_ADDRESS_1;
                    cbeneInfo.bene_add2 = item.BENE_ADDRESS_2;
                    cbeneInfo.bene_city = item.BENE_CITY;
                    cbeneInfo.bene_state = item.BENE_STATE;
                    cbeneInfo.bene_zip = item.BENE_ZIP_CODE;
                    cbeneInfo.bene_fzip = item.BENE_FOREIGN_ZIP_CODE;
                    cbeneInfo.Active_Bene = item.ACTIVE_BENE_FLAG;

                    searchSelect.InsertBeneInfo(cbeneInfo);
                }
                
            }

            catch (Exception ex)
            {
                ServiceLogger.log.Error("GetBeneInfo. Exception Error: ", ex);
            }
            finally
            {

            }
            jsonResult = jsonResult.Replace(@"[", "{ \"data\":[").Replace("]", "]}");

            return jsonResult;

        }
        


    }
}