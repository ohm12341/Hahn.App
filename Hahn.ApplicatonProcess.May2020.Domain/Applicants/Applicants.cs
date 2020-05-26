using System;
using System.Collections.Generic;
using System.Text;

namespace Hahn.ApplicatonProcess.May2020.Domain.Applicants
{
    public class Applicant : BaseEntity
    {

        public string Name { get; set; }

        public string Family { get; set; }

        public string Address { get; set; }

        public string CountryOfOrgin { get; set; } 

        public string Email { get; set; }

        public bool IsHired { get; set; }

        public int Age { get; set; }
    }
}
