using System;
using SilosApi;
namespace Example
{
	class MainClass
	{
		public static void Main (string[] args)
		{
			Silos api = new Silos ("http://localhost", "3000", "9NZvdpkbwP9FjsNZYH7egzQb7oyqbujER2C568i9cocviTHgW8Y4QEs5C9oHyFAX");
			String respond=api.Debug ("LogName"," LogBody","LogThread");
			/*
			 * Rest of api logging function 
			 * each function has the same parameters
			 * api.Information
			 * api.Warnings
			 * api.Error
			 * api.Fatal
			 * 
			 */
			Console.WriteLine (respond);
			Console.ReadLine ();
		}
	}
}
