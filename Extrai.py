from bs4 import BeautifulSoup

html = open("Jupiter.txt", "r")

soup =  BeautifulSoup(html, 'html.parser')

disciplinas = soup.find_all(class_='disciplina')

print('[')
for disciplina in disciplinas:
	codigo = disciplina.text
	nome = disciplina.find_next('td').text
	pr = []
		
	tr = disciplina.parent
	next_tr = tr.find_next('tr')

	while next_tr and "Requisito" in next_tr.text: # next_tr != None
		el = next_tr.find_next().text.split()
		pr.append(el[0])
		next_tr = next_tr.find_next('tr')

	v = '['
	for i in range(len(pr)):
		if(i < len(pr) - 1):
			v = v + '"' + pr[i] + '", '
		else:
			v = v + '"' + pr[i] + '"'
	
	v += ']'

	print('\t{ "disciplina" : "' + nome + '",\n\t "codigo" : "' + codigo + '",\n\t "prerequisitos" : ' + v + '\n\t},')
print(']')