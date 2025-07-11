export const questionsInfo = [
    {
        prompt: "Πώς μπορώ να μάθω αν δικαιούμαι κάποιο επίδομα;",
        answer: "Μπορείτε να χρησιμοποιήσετε το εργαλείο προσομοίωσης στην πλατφόρμα για να ελέγξετε αν πληροίτε τα κριτήρια για τα επιδόματα που σας ενδιαφέρουν.",
        tag: "all"
    },
    {
        prompt: "Είναι οι πληροφορίες που παρέχω ασφαλείς;",
        answer: "Ναι, η πλατφόρμα δεν αποθηκεύει προσωπικά δεδομένα. Όλες οι πληροφορίες χρησιμοποιούνται μόνο για να γίνει ο υπολογισμός των δικαιωμάτων σας.",
        tag: "all"
    },
    {
        prompt: "Τι κάνω αν δικαιούμαι ένα επίδομα;",
        answer: "Αφού μάθετε αν δικαιούστε κάποιο επίδομα, μπορείτε να ακολουθήσετε τις οδηγίες και να υποβάλετε αίτηση μέσω των επίσημων ιστοσελίδων του κράτους.",
        tag: "all"
    },
    {
        prompt: "Τι είναι το Επίδομα Παιδιού - Α21;",
        answer: "Το Επίδομα Παιδιού Α21 είναι μια οικονομική ενίσχυση που χορηγείται σε οικογένειες με παιδιά, με σκοπό να στηρίξει τα νοικοκυριά σε ανάγκη.",
        tag: "childBenefit"
    },
    {
        prompt: "Ποιες είναι οι προϋποθέσεις για το Επίδομα Παιδιού - Α21;",
        answer: `
            Για να δικαιούστε το Επίδομα Παιδιού Α21, πρέπει να πληροίτε συγκεκριμένα κριτήρια εισοδήματος και οικογενειακής κατάστασης. 
            Μπορείτε να ελέγξετε τις λεπτομέρειες στην πλατφόρμα του 
            <a class='govgr-link govgr-!-font-size-19' href='https://opeka.gr/oikogeneia/epidoma-paidiou-a21/' rel='noreferrer noopener' target='_blank'>
              ΟΠΕΚΑ
            </a>.
        `,
        tag: "childBenefit"
    },
    {
        prompt: "Πώς μπορώ να υποβάλω αίτηση για το Επίδομα Παιδιού - Α21;",
        answer: 
            `
            Η αίτηση για το Επίδομα Παιδιού Α21 γίνεται ηλεκτρονικά μέσω της 
            πλατφόρμας του 
            <a class='govgr-link govgr-!-font-size-19' href='https://www.idika.gr/epidomapaidiou/' rel='noreferrer noopener' target='_blank'>
              ΗΔΙΚΑ - ΕΠΙΔΟΜΑ ΠΑΙΔΙΟΥ(Α21)
            </a>.
            `,
        tag: "childBenefit"
    },
    {
        prompt: "Τι είναι το Επίδομα Θέρμανσης;",
        answer: 
        `
            Το Επίδομα Θέρμανσης είναι προνοιακό πρόγραμμα επιδότησης θέρμανσης.<br>
            Απευθύνεται σε όσους καταναλώνουν για τη θέρμανσή τους:
            <ol class='govgr-list govgr-list--bullet'>
                <li>ηλεκτρική ενέργεια και πληρούν τα κριτήρια χορήγησης με βάση την απόφαση <a class='govgr-link govgr-!-font-size-16' href='https://www.aade.gr/sites/default/files/2023-12/FEK-2023-Tefxos%20B-07253-21_12_2023.pdf' rel='noreferrer noopener' target='_blank'>ΥΠΕΝ/ΓρΥφΠΕΝ/135405/1603</a>.</li>
                <li>πετρέλαιο εσωτερικής καύσης θέρμανσης ή φυσικό αέριο ή υγραέριο ή καυσόξυλα ή βιομάζα (πέλετ) ή θερμική ενέργεια μέσω τηλεθέρμανσης 
                ή φωτιστικό πετρέλαιο (μπλε κηροζίνη) και πληρούν τα κριτήρια χορήγησης με βάση την απόφαση ΓΔΟΥ 125/27.10.2023 (ΦΕΚ Β' 6238).
                </li>
            </ol>
            Δείτε πιο αναλυτικά στο Εθνικό Μητρώο Διοικητικών Διαδικασιών: 
            <a class='govgr-link' href='https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%95%CF%80%CE%AF%CE%B4%CE%BF%CE%BC%CE%B1_%CE%9A%CE%B1%CF%84%CE%B1%CE%BD%CE%AC%CE%BB%CF%89%CF%83%CE%B7%CF%82_%CE%A0%CE%B5%CF%84%CF%81%CE%B5%CE%BB%CE%B1%CE%AF%CE%BF%CF%85_%CE%98%CE%AD%CF%81%CE%BC%CE%B1%CE%BD%CF%83%CE%B7%CF%82' rel='noreferrer noopener' target='_blank'>
                Επίδομα Θέρμανσης - ΜΙΤΟΣ
            </a>
            `,
            tag: "heatingBenefit"
    },
    {
        prompt: "Ποιες είναι οι προϋποθέσεις για το Επίδομα Θέρμανσης;",
        answer: `
            Για να δικαιούστε το Επίδομα Παιδιού Α21, πρέπει να πληροίτε συγκεκριμένα κριτήρια εισοδήματος και οικογενειακής κατάστασης. 
            Μπορείτε να ελέγξετε τις λεπτομέρειες στην πλατφόρμα του 
            <a class='govgr-link govgr-!-font-size-19' href='https://opeka.gr/oikogeneia/epidoma-paidiou-a21/' rel='noreferrer noopener' target='_blank' style="text-decoration:none">
              ΟΠΕΚΑ
            </a>.
        `,
        tag: "heatingBenefit"
    },
    {
        prompt: "Πώς μπορώ να υποβάλω αίτηση για το Επίδομα Θέρμανσης;",
        answer: 
            `
            Η αίτηση για το Επίδομα Παιδιού Α21 γίνεται ηλεκτρονικά μέσω της 
            πλατφόρμας του 
            <a class='govgr-link govgr-!-font-size-19' href='https://www.idika.gr/epidomapaidiou/' rel='noreferrer noopener' target='_blank' style="text-decoration:none">
              ΗΔΙΚΑ - ΕΠΙΔΟΜΑ ΠΑΙΔΙΟΥ(Α21)
            </a>.
            `,
        tag: "heatingBenefit"
    },
    {
        prompt: "Τι είναι το Επίδομα Στέγασης;",
        answer: 
        `
        Το Επίδομα Στέγασης είναι προνοιακό πρόγραμμα επιδότησης ενοικίου για τα νοικοκυριά που μισθώνουν την κύρια κατοικία τους.
        Μέσω της συγκεκριμένης διαδικασίας, οι δικαιούχοι έχουν τη δυνατότητα να 
        διεκδικήσουν οικονομική ενίσχυση για την κάλυψη του κόστους στέγασης, υπό την προϋπόθεση ότι πληρούν τα σχετικά κριτήρια επιλεξιμότητας.
        </br> </br> Δείτε πιο αναλυτικά στο Εθνικό Μητρώο Διοικητικών Διαδικασιών: 
        <a class='govgr-link govgr-!-font-size-19' href='https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%95%CF%80%CE%AF%CE%B4%CE%BF%CE%BC%CE%B1_%CE%A3%CF%84%CE%AD%CE%B3%CE%B1%CF%83%CE%B7%CF%82' rel='noreferrer noopener' target='_blank'>
            Επίδομα Στέγασης - ΜΙΤΟΣ
        </a>
        `,
            tag: "housingBenefit"
    },
    {
        prompt: "Ποιες είναι οι προϋποθέσεις για το Επίδομα Στέγασης;",
        answer: `
            Για να δικαιούστε το Επίδομα Παιδιού Α21, πρέπει να πληροίτε συγκεκριμένα κριτήρια εισοδήματος και οικογενειακής κατάστασης. 
            Μπορείτε να ελέγξετε τις λεπτομέρειες στην πλατφόρμα του 
            <a class='govgr-link govgr-!-font-size-19' href='https://opeka.gr/oikogeneia/epidoma-paidiou-a21/' rel='noreferrer noopener' target='_blank'>
              ΟΠΕΚΑ
            </a>.
        `,
        tag: "housingBenefit"
    },
    {
        prompt: "Πώς μπορώ να υποβάλω αίτηση για το Επίδομα Στέγασης;",
        answer: 
            `
            Η αίτηση για το Επίδομα Παιδιού Α21 γίνεται ηλεκτρονικά μέσω της 
            πλατφόρμας του 
            <a class='govgr-link govgr-!-font-size-19' href='https://www.idika.gr/epidomapaidiou/' rel='noreferrer noopener' target='_blank'>
              ΗΔΙΚΑ - ΕΠΙΔΟΜΑ ΠΑΙΔΙΟΥ(Α21)
            </a>.
            `,
        tag: "housingBenefit"
    },
    {
        prompt: "Τι είναι το Ελάχιστο Εγγυημένο Εισόδημα;",
        answer: 
        `
        Το Επίδομα Στέγασης είναι προνοιακό πρόγραμμα επιδότησης ενοικίου για τα νοικοκυριά που μισθώνουν την κύρια κατοικία τους.
        Μέσω της συγκεκριμένης διαδικασίας, οι δικαιούχοι έχουν τη δυνατότητα να 
        διεκδικήσουν οικονομική ενίσχυση για την κάλυψη του κόστους στέγασης, υπό την προϋπόθεση ότι πληρούν τα σχετικά κριτήρια επιλεξιμότητας.
        </br> </br> Δείτε πιο αναλυτικά στο Εθνικό Μητρώο Διοικητικών Διαδικασιών: 
        <a class='govgr-link govgr-!-font-size-19' href='https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%95%CF%80%CE%AF%CE%B4%CE%BF%CE%BC%CE%B1_%CE%A3%CF%84%CE%AD%CE%B3%CE%B1%CF%83%CE%B7%CF%82' rel='noreferrer noopener' target='_blank'>
            Επίδομα Στέγασης - ΜΙΤΟΣ
        </a>
        `,
            tag: "vulnerableBenefit"
    },
    {
        prompt: "Τι είναι το Κοινωνικό Οικιακό Τιμολόγιο;",
        answer: `
            Για να δικαιούστε το Επίδομα Παιδιού Α21, πρέπει να πληροίτε συγκεκριμένα κριτήρια εισοδήματος και οικογενειακής κατάστασης. 
            Μπορείτε να ελέγξετε τις λεπτομέρειες στην πλατφόρμα του 
            <a class='govgr-link govgr-!-font-size-19' href='https://opeka.gr/oikogeneia/epidoma-paidiou-a21/' rel='noreferrer noopener' target='_blank'>
              ΟΠΕΚΑ
            </a>.
        `,
        tag: "vulnerableBenefit"
    },
    {
        prompt: "Πώς μπορώ να υποβάλω αίτηση για το Επίδομα Στέγασης;",
        answer: 
            `
            Η αίτηση για το Επίδομα Παιδιού Α21 γίνεται ηλεκτρονικά μέσω της 
            πλατφόρμας του 
            <a class='govgr-link govgr-!-font-size-19' href='https://www.idika.gr/epidomapaidiou/' rel='noreferrer noopener' target='_blank'>
              ΗΔΙΚΑ - ΕΠΙΔΟΜΑ ΠΑΙΔΙΟΥ(Α21)
            </a>.
            `,
        tag: "vulnerableBenefit"
    },

]