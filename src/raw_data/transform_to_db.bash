
cat data-08-01.csv | python3 -c 'import csv, json, sys; print(json.dumps([dict(r) for r in csv.DictReader(sys.stdin)]))' > db.json 

        # "PS": "(.*)",
        # "PSD": "(.*)",
        # "CH": "(.*)",
        # "IL": "(.*)",
        # "PCP": "(.*)",
        # "BE": "(.*)",
        # "PAN": "(.*)",
        # "L": "(.*)",

        # "votes":{
        #     "PS": $1,
        #     "PSD": $2,
        #     "CH": $3,
        #     "IL": $4,
        #     "PCP": $5,
        #     "BE": $6,
        #     "PAN": $7,
        #     "L": $8
        # },