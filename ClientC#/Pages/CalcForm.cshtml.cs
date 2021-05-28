using System;
using System.Net.Http;
using System.Text;
using ClientC_.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;

namespace ClientC_.Pages
{
    public class CalcFormModel : PageModel
    {
        public string Result { get; set; } = "";
        public bool WasCalculated { get; set; } = false;
        private HttpClient client;
        public CalcFormModel()
        {
            client = new HttpClient();
            client.BaseAddress = new Uri("http://127.0.0.1:5000/");
        }

        public void OnGet()
        {

        }

        public void OnPost()
        {
            if (!String.IsNullOrEmpty(Request.Form["action"]) && Request.Form["action"] == "calcular")
            {
                CalcViewModel calcData = new CalcViewModel() 
                { 
                    num1 = Request.Form["num1"],
                    num2 = Request.Form["num2"],
                    operador = Request.Form["operator"]
                }; 
                var json = Newtonsoft.Json.JsonConvert.SerializeObject(calcData);
                var dataToSend = new System.Net.Http.StringContent(json, Encoding.UTF8, "application/json");
                var response = client.PostAsync("/calc/", dataToSend).Result; 
                if (response.IsSuccessStatusCode)
                {
                    string jsonResponse = response.Content.ReadAsStringAsync().Result;
                    ResultViewModel result = JsonConvert.DeserializeObject<ResultViewModel>(jsonResponse);
                    System.Console.WriteLine(jsonResponse);
                    if (!String.IsNullOrEmpty(result.resultado))
                    {
                        Result = result.resultado;
                        WasCalculated = true;
                    }
                }
            }
        }
    }
}
