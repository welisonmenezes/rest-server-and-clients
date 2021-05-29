using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using ClientC_.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;

namespace ClientC_.Pages
{
    public class CPFFormModel : PageModel
    {
        public string ValidationClass { get; set; } = "";
        public string ValidationMessage { get; set; } = "";
        public bool WasValidated { get; set; } = false;
        private HttpClient client;
        
        public CPFFormModel()
        {
            client = new HttpClient();
            client.BaseAddress = new Uri("http://127.0.0.1:5000/");
        }

        public void OnGet()
        {

        }

        public void OnPost()
        {
            if (!String.IsNullOrEmpty(Request.Form["action"]) && Request.Form["action"] == "validar")
            {
                CPFViewModel cpfData = new CPFViewModel() { cpf = Request.Form["cpf"] }; 
                var json = Newtonsoft.Json.JsonConvert.SerializeObject(cpfData);
                var dataToSend = new System.Net.Http.StringContent(json, Encoding.UTF8, "application/json");
                var response = client.PostAsync("/cpf/", dataToSend).Result; 
                if (response.IsSuccessStatusCode)
                {
                    string jsonResponse = response.Content.ReadAsStringAsync().Result;
                    ResultViewModel result = JsonConvert.DeserializeObject<ResultViewModel>(jsonResponse);
                    if (result.resultado == "false") 
                    {
                        ValidationClass = "danger";
                        ValidationMessage = "CPF Inválido";
                    }
                    else 
                    {
                        ValidationClass = "success";
                        ValidationMessage = "CPF Válido";
                    }
                    WasValidated = true;
                }
            }
        }
    }
}
