using System.Linq;
using System.Text.RegularExpressions;

namespace Server.Validations
{
    public static partial class UserValidations
    {
        public static string? ValidateName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return "Numele nu poate fi gol";
            }

            return name.Length switch
            {
                < 3 => "Numele e prea scurt",
                > 255 => "Numele e prea lung",
                _ => !name.Contains(' ')
                    ? "Numele e invalid (trebuie să fie format din nume și prenume, separate de un spațiu)"
                    : null
            };
        }

        public static string? ValidateEmail(string email)
        {
            MatchCollection matches = EmailRegex().Matches(email);
            if (matches.Count == 0 || matches.Count > 1 || matches[0].Value != email)
            {
                return "Email invalid";
            }

            return null;
        }

        public static string? ValidatePassword(string password)
        {
            switch (password.Length)
            {
                case < 6:
                    return "Parola e prea scurtă";
                case > 64:
                    return "Parola e prea lungă";
            }

            if (!password.Any(char.IsDigit))
            {
                return "Parola trebuie să conțină cel puțin o cifră";
            }

            return password.Any(char.IsUpper) ? null : "Parola trebuie să conțină cel puțin o majusculă (literă mare)";
        }

        public static string? ValidatePhone(string phone)
        {
            MatchCollection matches = RomanianPhoneRegex().Matches(phone);
            if (matches.Count == 0 || matches.Count > 1 || matches[0].Value != phone)
            {
                return "Număr de telefon invalid (trebuie să fie din România)";
            }
        
            return null;
        }

        [GeneratedRegex("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")]
        private static partial Regex EmailRegex();
    
        [GeneratedRegex(
            "^(\\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\\s|\\.|\\-)?([0-9]{3}(\\s|\\.|\\-|)){2}$", 
            RegexOptions.IgnoreCase | RegexOptions.Multiline)]
        private static partial Regex RomanianPhoneRegex();
    }
}
