import {Component, OnInit, ViewChild} from '@angular/core';
import {CovidApiService} from '../../services/covid-api.service';
import {isUndefined} from 'util';
import {PerfectScrollbarComponent} from 'ngx-perfect-scrollbar';
import * as Fuse from 'fuse.js';


@Component({
  selector: 'app-india-stats',
  templateUrl: './india-stats.component.html',
  styleUrls: ['./india-stats.component.scss']
})
export class IndiaStatsComponent implements OnInit {
  @ViewChild(PerfectScrollbarComponent) public directiveScroll: PerfectScrollbarComponent;
  indiastatus: any;
  indianstate: any;
  district: any;
  fuse: any;

  dtOptions: DataTables.Settings = {};
  isLoadingCountries = true;

  test = {
    "Kerala": {
      "districtData": {
        "Thrissur": {
          "confirmed": 12,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Alappuzha": {
          "confirmed": 2,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Kasaragod": {
          "confirmed": 136,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Pathanamthitta": {
          "confirmed": 13,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Kannur": {
          "confirmed": 49,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Ernakulam": {
          "confirmed": 23,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Kottayam": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Thiruvananthapuram": {
          "confirmed": 13,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Idukki": {
          "confirmed": 10,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Malappuram": {
          "confirmed": 13,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Kozhikode": {
          "confirmed": 7,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Palakkad": {
          "confirmed": 6,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Wayanad": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Kollam": {
          "confirmed": 5,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Delhi": {
      "districtData": {
        "East Delhi": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "South West Delhi": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "West Delhi": {
          "confirmed": 2,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "North Delhi": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "New Delhi": {
          "confirmed": 5,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "South Delhi": {
          "confirmed": 26,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "North East Delhi": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "North West Delhi": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Unknown": {
          "confirmed": 342,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Telangana": {
      "districtData": {
        "Hyderabad": {
          "confirmed": 36,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Karimnagar": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Bhadradri Kothagudem": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Ranga Reddy": {
          "confirmed": 2,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Medchal Malkajgiri": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Unknown": {
          "confirmed": 184,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Rajasthan": {
      "districtData": {
        "Jaipur": {
          "confirmed": 56,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Jhunjhunu": {
          "confirmed": 15,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 6
          }
        },
        "Bhilwara": {
          "confirmed": 23,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 1
          }
        },
        "Jodhpur": {
          "confirmed": 20,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 5
          }
        },
        "Unknown": {
          "confirmed": 31,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Pratapgarh": {
          "confirmed": 2,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Ajmer": {
          "confirmed": 5,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Alwar": {
          "confirmed": 4,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Dungarpur": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Tonk": {
          "confirmed": 16,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Churu": {
          "confirmed": 9,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 2
          }
        },
        "Bikaner": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 1
          }
        },
        "Jaisalmer": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Udaipur": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Dausa": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Bharatpur": {
          "confirmed": 2,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Banswara": {
          "confirmed": 2,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 2
          }
        }
      }
    },
    "Haryana": {
      "districtData": {
        "Gurugram": {
          "confirmed": 29,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Faridabad": {
          "confirmed": 6,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Panipat": {
          "confirmed": 4,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Panchkula": {
          "confirmed": 2,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Sonipat": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Palwal": {
          "confirmed": 4,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Ambala": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Sirsa": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Hisar": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Rohtak": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Nuh": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Karnal": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Uttar Pradesh": {
      "districtData": {
        "Agra": {
          "confirmed": 9,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Unknown": {
          "confirmed": 98,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Ghaziabad": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Lucknow": {
          "confirmed": 9,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Gautam Buddha Nagar": {
          "confirmed": 34,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Moradabad": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Varanasi": {
          "confirmed": 2,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Kanpur Nagar": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Pilibhit": {
          "confirmed": 2,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Jaunpur": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Baghpat": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Meerut": {
          "confirmed": 5,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Bareilly": {
          "confirmed": 6,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Ladakh": {
      "districtData": {
        "Leh": {
          "confirmed": 11,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Kargil": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Tamil Nadu": {
      "districtData": {
        "Kancheepuram": {
          "confirmed": 4,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Chennai": {
          "confirmed": 84,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Erode": {
          "confirmed": 27,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Coimbatore": {
          "confirmed": 33,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Tirunelveli": {
          "confirmed": 36,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Tiruppur": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Madurai": {
          "confirmed": 15,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Salem": {
          "confirmed": 8,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Vellore": {
          "confirmed": 2,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Tiruchirappalli": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Chengalpattu": {
          "confirmed": 15,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Thanjavur": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Virudhunagar": {
          "confirmed": 11,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Karur": {
          "confirmed": 20,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Tiruvannamalai": {
          "confirmed": 2,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Viluppuram": {
          "confirmed": 13,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Namakkal": {
          "confirmed": 21,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Kanniyakumari": {
          "confirmed": 5,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Thoothukkudi": {
          "confirmed": 9,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Theni": {
          "confirmed": 21,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Dindigul": {
          "confirmed": 43,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Sivaganga": {
          "confirmed": 5,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Tirupathur": {
          "confirmed": 10,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Thiruvarur": {
          "confirmed": 12,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Ranipet": {
          "confirmed": 4,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Ramanathapuram": {
          "confirmed": 2,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Thiruvallur": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Nagapattinam": {
          "confirmed": 5,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Jammu and Kashmir": {
      "districtData": {
        "Jammu": {
          "confirmed": 10,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Srinagar": {
          "confirmed": 17,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Bandipore": {
          "confirmed": 9,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Unknown": {
          "confirmed": 27,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Rajouri": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Badgam": {
          "confirmed": 2,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Baramula": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Shopian": {
          "confirmed": 2,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Kashmir": {
          "confirmed": 4,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Karnataka": {
      "districtData": {
        "Bengaluru": {
          "confirmed": 47,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Kalaburagi": {
          "confirmed": 5,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Kodagu": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Chikkaballapura": {
          "confirmed": 10,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Mysuru": {
          "confirmed": 21,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Dharwad": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Uttara Kannada": {
          "confirmed": 9,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Dakshina Kannada": {
          "confirmed": 8,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Udupi": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Chitradurga": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Tumakuru": {
          "confirmed": 2,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Davanagere": {
          "confirmed": 2,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Ballari": {
          "confirmed": 4,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Bidar": {
          "confirmed": 10,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Bagalkote": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Belagavi": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Maharashtra": {
      "districtData": {
        "Pune": {
          "confirmed": 63,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Mumbai": {
          "confirmed": 198,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Nagpur": {
          "confirmed": 12,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Thane": {
          "confirmed": 10,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Ahmadnagar": {
          "confirmed": 19,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Yavatmal": {
          "confirmed": 4,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Aurangabad": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Ratnagiri": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Mumbai Suburban": {
          "confirmed": 4,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Unknown": {
          "confirmed": 140,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Sangli": {
          "confirmed": 25,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Satara": {
          "confirmed": 2,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Kolhapur": {
          "confirmed": 2,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Gondiya": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Jalgaon": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Nashik": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Buldana": {
          "confirmed": 6,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Punjab": {
      "districtData": {
        "Amritsar": {
          "confirmed": 6,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Shahid Bhagat Singh Nagar": {
          "confirmed": 19,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "S.A.S. Nagar": {
          "confirmed": 11,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Hoshiarpur": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Jalandhar": {
          "confirmed": 5,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Unknown": {
          "confirmed": 6,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Ludhiana": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Andhra Pradesh": {
      "districtData": {
        "S.P.S. Nellore": {
          "confirmed": 32,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Prakasam": {
          "confirmed": 17,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Visakhapatnam": {
          "confirmed": 15,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "East Godavari": {
          "confirmed": 11,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Krishna": {
          "confirmed": 23,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Chittoor": {
          "confirmed": 9,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Guntur": {
          "confirmed": 20,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Kurnool": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Anantapur": {
          "confirmed": 2,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "West Godavari": {
          "confirmed": 15,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Y.S.R.": {
          "confirmed": 19,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Uttarakhand": {
      "districtData": {
        "Dehradun": {
          "confirmed": 5,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Pauri Garhwal": {
          "confirmed": 2,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Udham Singh Nagar": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Unknown": {
          "confirmed": 6,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Odisha": {
      "districtData": {
        "Khordha": {
          "confirmed": 14,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Bhadrak": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Cuttack": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Puri": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Jajapur": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Puducherry": {
      "districtData": {
        "Mahe": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Puducherry": {
          "confirmed": 4,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "West Bengal": {
      "districtData": {
        "Kolkata": {
          "confirmed": 11,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "North 24 Parganas": {
          "confirmed": 4,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Nadia": {
          "confirmed": 5,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Medinipur East": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Kalimpong": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Hooghly": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Howrah": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "South 24 Parganas": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Unknown": {
          "confirmed": 26,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Chandigarh": {
      "districtData": {
        "Chandigarh": {
          "confirmed": 16,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Unknown": {
          "confirmed": 2,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Chhattisgarh": {
      "districtData": {
        "Raipur": {
          "confirmed": 5,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Rajnandgaon": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Bilaspur": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Durg": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Korba": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Gujarat": {
      "districtData": {
        "Rajkot": {
          "confirmed": 10,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Surat": {
          "confirmed": 12,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Ahmadabad": {
          "confirmed": 38,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Vadodara": {
          "confirmed": 9,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Gandhinagar": {
          "confirmed": 11,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Kachchh": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Mahesana": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Bhavnagar": {
          "confirmed": 7,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Porbandar": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Gir Somnath": {
          "confirmed": 2,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Panch Mahals": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Himachal Pradesh": {
      "districtData": {
        "Kangra": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Una": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Madhya Pradesh": {
      "districtData": {
        "Jabalpur": {
          "confirmed": 8,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Bhopal": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Indore": {
          "confirmed": 91,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Ujjain": {
          "confirmed": 5,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Gwalior": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Shivpuri": {
          "confirmed": 2,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Unknown": {
          "confirmed": 21,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Morena": {
          "confirmed": 22,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Chhindwara": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Bihar": {
      "districtData": {
        "Munger": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Patna": {
          "confirmed": 4,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Siwan": {
          "confirmed": 6,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Nalanda": {
          "confirmed": 2,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Unknown": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Lakhisarai": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Bhagalpur": {
          "confirmed": 4,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Gopalganj": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Gaya": {
          "confirmed": 5,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Begusarai": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Saran": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Manipur": {
      "districtData": {
        "Imphal West": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Unknown": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Mizoram": {
      "districtData": {
        "Aizawl": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Goa": {
      "districtData": {
        "North Goa": {
          "confirmed": 4,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 1
          }
        },
        "Unknown": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Andaman and Nicobar Islands": {
      "districtData": {
        "South Andaman": {
          "confirmed": 5,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "North and Middle Andaman": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Unknown": {
          "confirmed": 4,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Jharkhand": {
      "districtData": {
        "Ranchi": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Hazaribagh": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Assam": {
      "districtData": {
        "Cachar": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Kamrup Metropolitan": {
          "confirmed": 5,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Jorhat": {
          "confirmed": 8,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Goalpara": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Nalbari": {
          "confirmed": 3,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "South Salmara Mancachar": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Kamrup": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Morigaon": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        },
        "Golaghat": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 1
          }
        }
      }
    },
    "Arunachal Pradesh": {
      "districtData": {
        "Lohit": {
          "confirmed": 1,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    },
    "Unknown": {
      "districtData": {
        "Unknown": {
          "confirmed": 697,
          "lastupdatedtime": "",
          "delta": {
            "confirmed": 0
          }
        }
      }
    }
  }

  constructor(private apiService: CovidApiService) {
  }

  ngOnInit() {

    this.apiService.getIndiaStatus().subscribe((country: {}) => {
      this.indiastatus = country;
    });

    this.apiService.getIndiastateStatus().subscribe((state) => {
      this.indianstate = state;
    });

    this.apiService.getDistrictData().subscribe((district) => {
      this.district = district;
    });


    this.dtOptions = {
      pagingType: 'full_numbers'
    };

  }

  searchDistrict(key) {
    if (key) {
      this.district = this.fuse.search(key);
      if (isUndefined(this.directiveScroll)) { return; }
      this.directiveScroll.directiveRef.scrollToTop();
      return;
    }
    this.district = this.fuse.list;
  }

}
