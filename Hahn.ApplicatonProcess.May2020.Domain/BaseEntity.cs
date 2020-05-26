using System;
using System.Collections.Generic;
using System.Text;

namespace Hahn.ApplicatonProcess.May2020.Domain
{
  public  class BaseEntity:IBaseEntity
    {
        public int ID { get; set; }

        public int GetID()
        {
            return ID;
        }
    }
}
