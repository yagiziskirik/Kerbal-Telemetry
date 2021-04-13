import time
print("Please choose a language:")
print("1: English")
print("2: Pусский")
print("3: 中文")
print("4: Türkçe")
print("5: Français")
print("6: Español")
lang = input("> ")
refreshRate = 0
chartRate = 0
print("")
if lang == "1":  # English
    print("Web interface language is now selected as English.")
    print("Refresh rate and chart refresh rate are settings which will affect the performance of the program.")
    print("Higher you set these values, lighter the program will be.")
    print("Lower you set these values, it gets close to being more 'real-time'.")
    print("Please enter only numbers which you want to set:")
    refRateSet = False
    while refRateSet == False:
        try:
            print("")
            print("Please set the refresh rate for the program (default: 200ms)")
            refreshRate = input("Refresh Rate> ")
            refreshRate = 200 if refreshRate=="" else int(refreshRate)
            if refreshRate < 0:
                raise ValueError
            refRateSet = True
        except ValueError:
            print("Please enter a valid number.")
    chartRefSet = False
    while chartRefSet == False:
        try:
            print("")
            print("Please set the chart refresh rate for the program (default: 1200ms)")
            chartRate = input("Chart Refresh Rate> ")
            chartRate = 1200 if chartRate=="" else int(chartRate)
            if chartRate < 0:
                raise ValueError
            chartRefSet = True
        except ValueError:
            print("Please enter a valid number.")
    with open("static/refreshRate.json", "w") as f:
        f.write('{"refreshRate":'+str(refreshRate)+', "chartsRate": '+str(chartRate)+', "lang": "en"}')
    print("Settings saved successfully. Please restart the web interface.")
    time.sleep(3.5)
elif lang == "2":  # Russian
    print("Язык веб-интерфейса теперь выбран как русский.")
    print("Частота обновления и частота обновления диаграммы - это параметры, которые влияют на производительность программы.")
    print("Чем выше вы установите эти значения, тем легче будет программа.")
    print("Чем ниже вы устанавливаете эти значения, тем ближе они к «реальному времени».")
    print("Пожалуйста, введите только те числа, которые вы хотите установить:")
    refRateSet = False
    while refRateSet == False:
        try:
            print("")
            print("Установите частоту обновления для программы (по умолчанию: 200 мс)")
            refreshRate = input("Частота обновления> ")
            refreshRate = 200 if refreshRate=="" else int(refreshRate)
            if refreshRate < 0:
                raise ValueError
            refRateSet = True
        except ValueError:
            print("Пожалуйста, введите корректное число.")
    chartRefSet = False
    while chartRefSet == False:
        try:
            print("")
            print("Установите для программы частоту обновления графика (по умолчанию: 1200 мс)")
            chartRate = input("Частота обновления диаграммы> ")
            chartRate = 1200 if chartRate=="" else int(chartRate)
            if chartRate < 0:
                raise ValueError
            chartRefSet = True
        except ValueError:
            print("Пожалуйста, введите корректное число.")
    with open("static/refreshRate.json", "w") as f:
        f.write('{"refreshRate":'+str(refreshRate)+', "chartsRate": '+str(chartRate)+', "lang": "ru"}')
    print("Настройки успешно сохранены. Пожалуйста, перезапустите веб-интерфейс.")
    time.sleep(3.5)
elif lang == "3":  # Chinese
    print("界面语言现已选择为中文。")
    print("刷新率和图表刷新率是会影响程序性能的设置")
    print("这些值设置得越高，程序就越轻。")
    print("将这些值设置得越低，它就越接近于“实时”。")
    print("请仅输入您要设置的数字：")
    refRateSet = False
    while refRateSet == False:
        try:
            print("")
            print("请设置程序的刷新率（默认值：200ms")
            refreshRate = input("刷新率> ")
            refreshRate = 100 if refreshRate=="" else int(refreshRate)
            if refreshRate < 0:
                raise ValueError
            refRateSet = True
        except ValueError:
            print("请输入一个有效的数字。")
    chartRefSet = False
    while chartRefSet == False:
        try:
            print("")
            print("请为程序设置图表刷新率（默认值：1200ms）")
            chartRate = input("图表刷新率> ")
            chartRate = 1200 if chartRate=="" else int(chartRate)
            if chartRate < 0:
                raise ValueError
            chartRefSet = True
        except ValueError:
            print("请输入一个有效的数字。")
    with open("static/refreshRate.json", "w") as f:
        f.write('{"refreshRate":'+str(refreshRate)+', "chartsRate": '+str(chartRate)+', "lang": "zh"}')
    print("设置已成功保存。 请重新启动界面。")
    time.sleep(3.5)
elif lang == "4":  # Turkish
    print("Arayüz dili Türkçe olarak seçildi.")
    print("Yenileme hızı ve grafik yenileme hızı programın çalışma performansını etkileyen ayarlardır.")
    print("Bu değerleri ne kadar yüksek ayarlarsanız, program o kadar hafif çalışır.")
    print("Ancak ne kadar düşük ayarlarsanız, o kadar 'gerçek zamanlı' olur.")
    print("Lütfen seçmek istediğinizi sayı ile giriniz:")
    refRateSet = False
    while refRateSet == False:
        try:
            print("")
            print("Lütfen programın yenileme hızını girin (varsayılan: 200ms)")
            refreshRate = input("Yenileme Hızı> ")
            refreshRate = 200 if refreshRate=="" else int(refreshRate)
            if refreshRate < 0:
                raise ValueError
            refRateSet = True
        except ValueError:
            print("Lütfen geçerli bir sayı girin.")
    chartRefSet = False
    while chartRefSet == False:
        try:
            print("")
            print("Lütfen grafik yenileme hızını girin (varsayılan: 1200ms)")
            chartRate = input("Grafik Yenileme Hızı> ")
            chartRate = 1200 if chartRate=="" else int(chartRate)
            if chartRate < 0:
                raise ValueError
            chartRefSet = True
        except ValueError:
            print("Lütfen geçerli bir sayı girin.")
    with open("static/refreshRate.json", "w") as f:
        f.write('{"refreshRate":'+str(refreshRate)+', "chartsRate": '+str(chartRate)+', "lang": "tr"}')
    print("Ayarlar başarıyla uygulandı. Lütfen web arayüzünü yeniden başlatın.")
    time.sleep(3.5)
elif lang == "5":  # French
    print("La langue de l'interface Web est maintenant sélectionnée comme le français.")
    print("Le taux de rafraîchissement et le taux de rafraîchissement du graphique sont des paramètres qui affecteront les performances du programme.")
    print("Plus vous définissez ces valeurs, plus le programme sera léger.")
    print("Plus bas vous définissez ces valeurs, cela devient plus \"en temps réel\".")
    print("Veuillez n'entrer que les nombres que vous souhaitez définir:")
    refRateSet = False
    while refRateSet == False:
        try:
            print("")
            print("Veuillez définir la fréquence de rafraîchissement du programme (par défaut: 200 ms)")
            refreshRate = input("Fréquence de rafraîchissement> ")
            refreshRate = 200 if refreshRate=="" else int(refreshRate)
            if refreshRate < 0:
                raise ValueError
            refRateSet = True
        except ValueError:
            print("S'il vous plait, entrez un nombre valide.")
    chartRefSet = False
    while chartRefSet == False:
        try:
            print("")
            print("Veuillez définir le taux de rafraîchissement du graphique pour le programme (par défaut: 1200 ms)")
            chartRate = input("Taux de rafraîchissement du graphique> ")
            chartRate = 1200 if chartRate=="" else int(chartRate)
            if chartRate < 0:
                raise ValueError
            chartRefSet = True
        except ValueError:
            print("S'il vous plait, entrez un nombre valide.")
    with open("static/refreshRate.json", "w") as f:
        f.write('{"refreshRate":'+str(refreshRate)+', "chartsRate": '+str(chartRate)+', "lang": "fr"}')
    print("Paramètres enregistrés avec succès. Veuillez redémarrer l'interface Web.")
    time.sleep(3.5)
elif lang == "6":  # Spanish
    print("El idioma de la interfaz web ahora está seleccionado como español.")
    print("La frecuencia de actualización y la frecuencia de actualización del gráfico son configuraciones que afectarán el rendimiento del programa.")
    print("Cuanto más altos establezca estos valores, más ligero será el programa.")
    print("Cuanto más bajo establezca estos valores, se acerca a ser más \"en tiempo real\".")
    print("Ingrese solo los números que desee configurar:")
    refRateSet = False
    while refRateSet == False:
        try:
            print("")
            print("Establezca la frecuencia de actualización del programa (predeterminado: 200 ms)")
            refreshRate = input("Frecuencia de actualización> ")
            refreshRate = 200 if refreshRate=="" else int(refreshRate)
            if refreshRate < 0:
                raise ValueError
            refRateSet = True
        except ValueError:
            print("Por favor ingrese un número valido.")
    chartRefSet = False
    while chartRefSet == False:
        try:
            print("")
            print("Configure la frecuencia de actualización del gráfico para el programa (predeterminado: 1200 ms)")
            chartRate = input("Tasa de actualización del gráfico> ")
            chartRate = 1200 if chartRate=="" else int(chartRate)
            if chartRate < 0:
                raise ValueError
            chartRefSet = True
        except ValueError:
            print("Por favor ingrese un número valido.")
    with open("static/refreshRate.json", "w") as f:
        f.write('{"refreshRate":'+str(refreshRate)+', "chartsRate": '+str(chartRate)+', "lang": "es"}')
    print("La configuración se ha guardado correctamente. Reinicie la interfaz web.")
    time.sleep(3.5)