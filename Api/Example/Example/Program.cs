using System;
using SilosApi;
namespace Example
{
	class MainClass
	{
		public static void Main (string[] args)
		{
			Silos api = new Silos ("http://localhost", "3000", "QZQB9DDJ6jLHmiYDbFqwjo37Zo6iWYDhRfSdKAJhqcStTQ9sazWAQMHiJePjKRL5");
			api.setFiled ("pole 23", "wartosc");
			String respond = api.Debug ("wiadomosc");
			/*
			 * Rest of api logging function 
			 * each function has the same parameters
			 * api.Information
			 * api.Warnings
			 * api.Error
			 * api.Fatal
			 * 
			 * add reference to file Library.dll from Library/Library/bin/Debug  
			 * 
			 */
			Console.WriteLine (respond);
			Console.ReadLine ();
		}
	}
}
