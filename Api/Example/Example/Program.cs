using System;
using SilosApi;
namespace Example
{
	class MainClass
	{
		public static void Main (string[] args)
		{
			Silos api = new Silos ("http://localhost", "3000", "9NZvdpkbwP9FjsNZYH7egzQb7oyqbujER2C568i9cocviTHgW8Y4QEs5C9oHyFAX");
			Console.WriteLine (api.Debug ("LogName"," LogBody","LogThread"));
			Console.ReadLine ();
		}
	}
}
