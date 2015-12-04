//--------------------------------
// by: Anneke ter Schure, 6084087
//
// make localhost server: python -m SimpleHTTPServer
// use url: http://localhost:8000/d3map.html
//--------------------------------



var map = new Datamap({
        element: document.getElementById('container'),
        fills: {
            VHIGH: '#810f7c',
            HIGH: '#8856a7',
            MEDIUM: '#8c96c6',
            LOW: '#b3cde3',
            VLOW: '#d8f0f6',
            defaultFill: '#cccccc'
        },
        geographyConfig: {
            borderWidth: 0.5,
            highlightFillColor: 'steelblue',
            highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
            highlightBorderWidth: 1,
            popupTemplate: function(geo, data) {
                if (data == null) {
                    return ['<div class="hoverinfo">',
                            'Annual growth rate in ' + geo.properties.name,
                            ': unknown',
                            '</div>'].join('');
                }
                else {
                    return ['<div class="hoverinfo">',
                            'Annual growth rate in ' + geo.properties.name,
                            ': ' + data.growth,
                            '</div>'].join('');
                }
            }
        },
        data: {
            "ABW": {
                "fillKey": "MEDIUM",
                "growth": "0.50"
            },
            "ADO": {
                "fillKey": "VLOW",
                "growth": "-4.19"
            },
            "AFG": {
                "fillKey": "VHIGH",
                "growth": "3.03"
            },
            "AGO": {
                "fillKey": "VHIGH",
                "growth": "3.27"
            },
            "ALB": {
                "fillKey": "LOW",
                "growth": "-0.10"
            },
            "ARE": {
                "fillKey": "MEDIUM",
                "growth": "0.51"
            },
            "ARG": {
                "fillKey": "MEDIUM",
                "growth": "1.03"
            },
            "ARM": {
                "fillKey": "LOW",
                "growth": "0.47"
            },
            "ASM": {
                "fillKey": "LOW",
                "growth": "0.24"
            },
            "ATG": {
                "fillKey": "MEDIUM",
                "growth": "1.01"
            },
            "AUS": {
                "fillKey": "LOW",
                "growth": "1.57"
            },
            "AUT": {
                "fillKey": "MEDIUM",
                "growth": "0.65"
            },
            "AZE": {
                "fillKey": "MEDIUM",
                "growth": "1.28"
            },
            "BDI": {
                "fillKey": "VHIGH",
                "growth": "3.30"
            },
            "BEL": {
                "fillKey": "LOW",
                "growth": "0.38"
            },
            "BEN": {
                "fillKey": "HIGH",
                "growth": "2.64"
            },
            "BFA": {
                "fillKey": "HIGH",
                "growth": "2.91"
            },
            "BGD": {
                "fillKey": "MEDIUM",
                "growth": "1.21"
            },
            "BGR": {
                "fillKey": "VLOW",
                "growth": "-0.54"
            },
            "BHR": {
                "fillKey": "MEDIUM",
                "growth": "0.92"
            },
            "BHS": {
                "fillKey": "MEDIUM",
                "growth": "1.37"
            },
            "BIH": {
                "fillKey": "LOW",
                "growth": "-0.16"
            },
            "BLR": {
                "fillKey": "LOW",
                "growth": "0.04"
            },
            "BLZ": {
                "fillKey": "HIGH",
                "growth": "2.16"
            },
            "BMU": {
                "fillKey": "LOW",
                "growth": "0.28"
            },
            "BOL": {
                "fillKey": "LOW",
                "growth": "1.55"
            },
            "BRA": {
                "fillKey": "MEDIUM",
                "growth": "0.89"
            },
            "BRB": {
                "fillKey": "LOW",
                "growth": "0.31"
            },
            "BRN": {
                "fillKey": "MEDIUM",
                "growth": "1.42"
            },
            "BTN": {
                "fillKey": "MEDIUM",
                "growth": "1.36"
            },
            "BWA": {
                "fillKey": "LOW",
                "growth": "1.98"
            },
            "CAF": {
                "fillKey": "LOW",
                "growth": "1.97"
            },
            "CAN": {
                "fillKey": "MEDIUM",
                "growth": "1.08"
            },
            "CHE": {
                "fillKey": "MEDIUM",
                "growth": "1.24"
            },
            "CHI": {
                "fillKey": "LOW",
                "growth": "0.48"
            },
            "CHL": {
                "fillKey": "MEDIUM",
                "growth": "1.06"
            },
            "CHN": {
                "fillKey": "MEDIUM",
                "growth": "0.51"
            },
            "CIV": {
                "fillKey": "HIGH",
                "growth": "2.44"
            },
            "CMR": {
                "fillKey": "HIGH",
                "growth": "2.50"
            },
            "COG": {
                "fillKey": "HIGH",
                "growth": "2.49"
            },
            "COL": {
                "fillKey": "MEDIUM",
                "growth": "0.94"
            },
            "COM": {
                "fillKey": "HIGH",
                "growth": "2.40"
            },
            "CPV": {
                "fillKey": "MEDIUM",
                "growth": "1.30"
            },
            "CRI": {
                "fillKey": "MEDIUM",
                "growth": "1.08"
            },
            "CUB": {
                "fillKey": "LOW",
                "growth": "0.15"
            },
            "CUW": {
                "fillKey": "MEDIUM",
                "growth": "1.32"
            },
            "CYM": {
                "fillKey": "MEDIUM",
                "growth": "1.37"
            },
            "CYP": {
                "fillKey": "MEDIUM",
                "growth": "1.05"
            },
            "CZE": {
                "fillKey": "LOW",
                "growth": "-0.04"
            },
            "DEU": {
                "fillKey": "LOW",
                "growth": "0.30"
            },
            "DJI": {
                "fillKey": "MEDIUM",
                "growth": "1.34"
            },
            "DMA": {
                "fillKey": "LOW",
                "growth": "0.47"
            },
            "DNK": {
                "fillKey": "LOW",
                "growth": "0.44"
            },
            "DOM": {
                "fillKey": "MEDIUM",
                "growth": "1.20"
            },
            "DZA": {
                "fillKey": "LOW",
                "growth": "1.94"
            },
            "ECU": {
                "fillKey": "LOW",
                "growth": "1.53"
            },
            "EGY": {
                "fillKey": "HIGH",
                "growth": "2.22"
            },
            "ERI": {
                "fillKey": "HIGH",
                "growth": "2.21"
            },
            "ESP": {
                "fillKey": "LOW",
                "growth": "-0.46"
            },
            "EST": {
                "fillKey": "LOW",
                "growth": "-0.33"
            },
            "ETH": {
                "fillKey": "HIGH",
                "growth": "2.51"
            },
            "FIN": {
                "fillKey": "LOW",
                "growth": "0.45"
            },
            "FJI": {
                "fillKey": "MEDIUM",
                "growth": "0.67"
            },
            "FRA": {
                "fillKey": "LOW",
                "growth": "0.43"
            },
            "FRO": {
                "fillKey": "LOW",
                "growth": "-0.15"
            },
            "FSM": {
                "fillKey": "LOW",
                "growth": "0.31"
            },
            "GAB": {
                "fillKey": "HIGH",
                "growth": "2.24"
            },
            "GBR": {
                "fillKey": "MEDIUM",
                "growth": "0.63"
            },
            "GEO": {
                "fillKey": "LOW",
                "growth": "0.38"
            },
            "GHA": {
                "fillKey": "HIGH",
                "growth": "2.35"
            },
            "GIN": {
                "fillKey": "HIGH",
                "growth": "2.70"
            },
            "GMB": {
                "fillKey": "VHIGH",
                "growth": "3.23"
            },
            "GNB": {
                "fillKey": "HIGH",
                "growth": "2.44"
            },
            "GNQ": {
                "fillKey": "HIGH",
                "growth": "2.94"
            },
            "GRC": {
                "fillKey": "VLOW",
                "growth": "-0.64"
            },
            "GRD": {
                "fillKey": "LOW",
                "growth": "0.42"
            },
            "GRL": {
                "fillKey": "LOW",
                "growth": "-0.33"
            },
            "GTM": {
                "fillKey": "HIGH",
                "growth": "2.05"
            },
            "GUM": {
                "fillKey": "MEDIUM",
                "growth": "1.46"
            },
            "GUY": {
                "fillKey": "LOW",
                "growth": "0.38"
            },
            "HKG": {
                "fillKey": "MEDIUM",
                "growth": "0.75"
            },
            "HND": {
                "fillKey": "MEDIUM",
                "growth": "1.42"
            },
            "HRV": {
                "fillKey": "LOW",
                "growth": "-0.45"
            },
            "HTI": {
                "fillKey": "MEDIUM",
                "growth": "1.34"
            },
            "HUN": {
                "fillKey": "LOW",
                "growth": "-0.32"
            },
            "IDN": {
                "fillKey": "MEDIUM",
                "growth": "1.26"
            },
            "IMY": {
                "fillKey": "MEDIUM",
                "growth": "0.77"
            },
            "IND": {
                "fillKey": "MEDIUM",
                "growth": "1.23"
            },
            "IRL": {
                "fillKey": "LOW",
                "growth": "0.31"
            },
            "IRN": {
                "fillKey": "MEDIUM",
                "growth": "1.28"
            },
            "IRQ": {
                "fillKey": "VHIGH",
                "growth": "3.01"
            },
            "ISL": {
                "fillKey": "MEDIUM",
                "growth": "1.17"
            },
            "ISR": {
                "fillKey": "LOW",
                "growth": "1.91"
            },
            "ITA": {
                "fillKey": "LOW",
                "growth": "1.81"
            },
            "JAM": {
                "fillKey": "LOW",
                "growth": "0.24"
            },
            "JOR": {
                "fillKey": "HIGH",
                "growth": "2.25"
            },
            "JPN": {
                "fillKey": "LOW",
                "growth": "-0.16"
            },
            "KAZ": {
                "fillKey": "MEDIUM",
                "growth": "1.48"
            },
            "KEN": {
                "fillKey": "HIGH",
                "growth": "2.64"
            },
            "KGZ": {
                "fillKey": "LOW",
                "growth": "1.98"
            },
            "KHM": {
                "fillKey": "LOW",
                "growth": "1.64"
            },
            "KIR": {
                "fillKey": "LOW",
                "growth": "1.76"
            },
            "KNA": {
                "fillKey": "MEDIUM",
                "growth": "1.18"
            },
            "KOR": {
                "fillKey": "LOW",
                "growth": "0.41"
            },
            "KSV": {
                "fillKey": "LOW",
                "growth": "0.28"
            },
            "KWT": {
                "fillKey": "VHIGH",
                "growth": "4.34"
            },
            "LAO": {
                "fillKey": "LOW",
                "growth": "1.65"
            },
            "LBN": {
                "fillKey": "MEDIUM",
                "growth": "1.18"
            },
            "LBR": {
                "fillKey": "HIGH",
                "growth": "2.37"
            },
            "LBY": {
                "fillKey": "LOW",
                "growth": "-0.11"
            },
            "LCA": {
                "fillKey": "MEDIUM",
                "growth": "0.73"
            },
            "LIE": {
                "fillKey": "MEDIUM",
                "growth": "0.66"
            },
            "LKA": {
                "fillKey": "MEDIUM",
                "growth": "0.76"
            },
            "LSO": {
                "fillKey": "MEDIUM",
                "growth": "1.25"
            },
            "LTU": {
                "fillKey": "VLOW",
                "growth": "-0.96"
            },
            "LUX": {
                "fillKey": "HIGH",
                "growth": "2.31"
            },
            "LVA": {
                "fillKey": "VLOW",
                "growth": "-1.11"
            },
            "MAC": {
                "fillKey": "LOW",
                "growth": "1.72"
            },
            "MAF": {
                "fillKey": "MEDIUM",
                "growth": "0.85"
            },
            "MAR": {
                "fillKey": "MEDIUM",
                "growth": "1.39"
            },
            "MCO": {
                "fillKey": "LOW",
                "growth": "0.25"
            },
            "MDA": {
                "fillKey": "LOW",
                "growth": "-0.06"
            },
            "MDG": {
                "fillKey": "HIGH",
                "growth": "2.78"
            },
            "MDV": {
                "fillKey": "LOW",
                "growth": "1.78"
            },
            "MEX": {
                "fillKey": "MEDIUM",
                "growth": "1.32"
            },
            "MHL": {
                "fillKey": "LOW",
                "growth": "0.21"
            },
            "MKD": {
                "fillKey": "LOW",
                "growth": "0.15"
            },
            "MLI": {
                "fillKey": "HIGH",
                "growth": "2.93"
            },
            "MLT": {
                "fillKey": "MEDIUM",
                "growth": "0.95"
            },
            "MMR": {
                "fillKey": "MEDIUM",
                "growth": "0.85"
            },
            "MNE": {
                "fillKey": "LOW",
                "growth": "0.10"
            },
            "MNG": {
                "fillKey": "LOW",
                "growth": "1.76"
            },
            "MNP": {
                "fillKey": "MEDIUM",
                "growth": "1.24"
            },
            "MOZ": {
                "fillKey": "HIGH",
                "growth": "2.79"
            },
            "MRT": {
                "fillKey": "HIGH",
                "growth": "2.47"
            },
            "MUS": {
                "fillKey": "LOW",
                "growth": "0.18"
            },
            "MWI": {
                "fillKey": "VHIGH",
                "growth": "3.07"
            },
            "MYS": {
                "fillKey": "MEDIUM",
                "growth": "1.47"
            },
            "NAM": {
                "fillKey": "HIGH",
                "growth": "2.37"
            },
            "NCL": {
                "fillKey": "LOW",
                "growth": "1.52"
            },
            "NER": {
                "fillKey": "VHIGH",
                "growth": "4.03"
            },
            "NGA": {
                "fillKey": "HIGH",
                "growth": "2.66"
            },
            "NIC": {
                "fillKey": "MEDIUM",
                "growth": "1.14"
            },
            "NLD": {
                "fillKey": "LOW",
                "growth": "0.30"
            },
            "NOR": {
                "fillKey": "MEDIUM",
                "growth": "1.11"
            },
            "NPL": {
                "fillKey": "MEDIUM",
                "growth": "1.21"
            },
            "NZL": {
                "fillKey": "LOW",
                "growth": "1.51"
            },
            "OMN": {
                "fillKey": "VHIGH",
                "growth": "8.09"
            },
            "PAK": {
                "fillKey": "HIGH",
                "growth": "2.10"
            },
            "PAN": {
                "fillKey": "LOW",
                "growth": "1.61"
            },
            "PER": {
                "fillKey": "MEDIUM",
                "growth": "1.32"
            },
            "PHL": {
                "fillKey": "LOW",
                "growth": "1.59"
            },
            "PLW": {
                "fillKey": "MEDIUM",
                "growth": "0.85"
            },
            "PNG": {
                "fillKey": "HIGH",
                "growth": "2.09"
            },
            "POL": {
                "fillKey": "LOW",
                "growth": "-0.12"
            },
            "PRI": {
                "fillKey": "VLOW",
                "growth": "-1.33"
            },
            "PRK": {
                "fillKey": "MEDIUM",
                "growth": "0.53"
            },
            "PRT": {
                "fillKey": "VLOW",
                "growth": "-0.57"
            },
            "PRY": {
                "fillKey": "MEDIUM",
                "growth": "1.33"
            },
            "PYF": {
                "fillKey": "MEDIUM",
                "growth": "1.08"
            },
            "QAT": {
                "fillKey": "VHIGH",
                "growth": "3.31"
            },
            "ROM": {
                "fillKey": "LOW",
                "growth": "-0.36"
            },
            "RUS": {
                "fillKey": "LOW",
                "growth": "0.22"
            },
            "RWA": {
                "fillKey": "HIGH",
                "growth": "2.35"
            },
            "SAU": {
                "fillKey": "HIGH",
                "growth": "2.24"
            },
            "SDN": {
                "fillKey": "HIGH",
                "growth": "2.15"
            },
            "SEN": {
                "fillKey": "VHIGH",
                "growth": "3.13"
            },
            "SGP": {
                "fillKey": "MEDIUM",
                "growth": "1.30"
            },
            "SLB": {
                "fillKey": "HIGH",
                "growth": "2.03"
            },
            "SLE": {
                "fillKey": "HIGH",
                "growth": "2.19"
            },
            "SLV": {
                "fillKey": "LOW",
                "growth": "0.30"
            },
            "SMR": {
                "fillKey": "MEDIUM",
                "growth": "0.65"
            },
            "SOM": {
                "fillKey": "HIGH",
                "growth": "2.40"
            },
            "SRB": {
                "fillKey": "LOW",
                "growth": "-0.49"
            },
            "SSD": {
                "fillKey": "VHIGH",
                "growth": "3.92"
            },
            "STP": {
                "fillKey": "HIGH",
                "growth": "2.15"
            },
            "SUR": {
                "fillKey": "MEDIUM",
                "growth": "0.90"
            },
            "SVK": {
                "fillKey": "LOW",
                "growth": "0.09"
            },
            "SVN": {
                "fillKey": "LOW",
                "growth": "0.11"
            },
            "SWE": {
                "fillKey": "MEDIUM",
                "growth": "0.92"
            },
            "SWZ": {
                "fillKey": "MEDIUM",
                "growth": "1.47"
            },
            "SXM": {
                "fillKey": "HIGH",
                "growth": "2.85"
            },
            "SYC": {
                "fillKey": "LOW",
                "growth": "1.79"
            },
            "SYR": {
                "fillKey": "LOW",
                "growth": "1.68"
            },
            "TCA": {
                "fillKey": "LOW",
                "growth": "1.91"
            },
            "TCD": {
                "fillKey": "VHIGH",
                "growth": "3.30"
            },
            "TGO": {
                "fillKey": "HIGH",
                "growth": "2.66"
            },
            "THA": {
                "fillKey": "LOW",
                "growth": "0.41"
            },
            "TJK": {
                "fillKey": "HIGH",
                "growth": "2.24"
            },
            "TKM": {
                "fillKey": "MEDIUM",
                "growth": "1.27"
            },
            "TMP": {
                "fillKey": "HIGH",
                "growth": "2.68"
            },
            "TON": {
                "fillKey": "LOW",
                "growth": "0.42"
            },
            "TTO": {
                "fillKey": "LOW",
                "growth": "0.46"
            },
            "TUN": {
                "fillKey": "MEDIUM",
                "growth": "1.01"
            },
            "TUR": {
                "fillKey": "MEDIUM",
                "growth": "1.22"
            },
            "TUV": {
                "fillKey": "LOW",
                "growth": "0.17"
            },
            "TZA": {
                "fillKey": "VHIGH",
                "growth": "3.15"
            },
            "UGA": {
                "fillKey": "VHIGH",
                "growth": "3.25"
            },
            "UKR": {
                "fillKey": "LOW",
                "growth": "-0.28"
            },
            "URY": {
                "fillKey": "LOW",
                "growth": "0.34"
            },
            "USA": {
                "fillKey": "MEDIUM",
                "growth": "0.74"
            },
            "UZB": {
                "fillKey": "LOW",
                "growth": "1.64"
            },
            "VCT": {
                "fillKey": "LOW",
                "growth": "0.03"
            },
            "VEN": {
                "fillKey": "MEDIUM",
                "growth": "1.37"
            },
            "VIR": {
                "fillKey": "VLOW",
                "growth": "-0.54"
            },
            "VNM": {
                "fillKey": "MEDIUM",
                "growth": "1.13"
            },
            "VUT": {
                "fillKey": "HIGH",
                "growth": "2.23"
            },
            "WBG": {
                "fillKey": "HIGH",
                "growth": "2.96"
            },
            "WSM": {
                "fillKey": "MEDIUM",
                "growth": "0.76"
            },
            "YEM": {
                "fillKey": "HIGH",
                "growth": "2.52"
            },
            "ZAF": {
                "fillKey": "LOW",
                "growth": "1.58"
            },
            "ZAR": {
                "fillKey": "VHIGH",
                "growth": "3.15"
            },
            "ZMB": {
                "fillKey": "VHIGH",
                "growth": "3.07"
            },
            "ZWE": {
                "fillKey": "HIGH",
                "growth": "2.31"
            }
        }
    });
