$(function () {
	$('body').on('click', '#saveBtn', async function () {
		const dkg = new DKG({
			endpoint: 'v6-epsilon-node-01.origin-trail.network',
			port: '8900',
			useSSL: true,
			loglevel: 'trace'
		});

		var result = await dkg.nodeInfo();

		await create(dkg);
	});

	async function create(dkg) {
		OTModel1 = {};
		OTModel1['@context'] = [
			'https://w3id.org/demeter/agri-context.jsonld',
			'https://w3id.org/demeter/agri-context.jsonld'];

		OTModel1['@id'] = 'urn:demeter:plot:72d9fb43-53f8-4ec8-a33c-fa931360259a';
		OTModel1['@type'] = 'WineBottleProvenance';
		OTModel1['locationName'] = "Podgorica"

		crop = {};
		crop['@id'] = 'urn:ngsi-ld:crop:df72dc57-1eb9-42a3-88a9-8647ecc954b4';
		crop['@type'] = 'Crop';

		cropSpecies = {};
		cropSpecies['@id'] = 'urn:demeter:croptype:df72dc57-1eb9-42a3-88a9-8647ecc954b3';
		cropSpecies['@type'] = 'CropType';
		cropSpecies['name'] = $('croptype').val();
		cropSpecies['variety'] = $('varietytype').val();
		crop['pesticidesLastTreatment'] = $('pestlasttreat').val();
		crop['hasHarvestDate'] = '01.09.2021';
		crop['cropSpecies'] = cropSpecies;
		OTModel1['crop'] = crop;

		labAnalysis = {};
		labAnalysis['@id'] = 'urn:demeter:LA:72d9fb43-53f8-4ec8-a33c-fa931360259a';
		labAnalysis['@type'] = 'LabAnalysis';
		labAnalysis['sugarContent'] = $('sugarcontent').val();
		labAnalysis['acid'] = $('acid').val();
		labAnalysis['pH'] = $('phvalue').val();
		OTModel1['labAnalysis'] = labAnalysis

		wineBook = {};
		wineBook['@id'] = 'urn:demeter:LA:72d9fb43-53f8-4ec8-a33c-fa931360259a1';
		wineBook['@type'] = 'WineBook';
		wineBook['batchNumber'] = $('batchnum').val();
		wineBook['sulfur'] = $('sulfur').val();
		wineBook['typeOfWine'] = $('typeofwine').val();
		wineBook['alcohol'] = $('alcohol').val();
		wineBook['numberOfBottles'] = $('numberofbottles').val();
		OTModel1['wineBook'] = wineBook;

		wineryConditions = {};
		wineryConditions['@id'] = 'urn:demeter:LA:72d9fb43-53f8-4ec8-a33c-fa931360259a2';
		wineryConditions['@type'] = 'WineryConditions';
		wineryConditions['temperature'] = $('temperature').val();
		OTModel1['wineryConditions'] = wineryConditions;

		keyword = { 'keywords': ['wine'], 'visibility': 'public' };
		var result = await dkg.assets.create(OTModel1, keyword);

		let ual = result.data.metadata.UALs[0];
		console.log(ual);
	}
});